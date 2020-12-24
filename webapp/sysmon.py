import psutil
import pandas as pd
import logging
import datetime
import collections
from math import log

defaultdict = collections.defaultdict(dict)


class Monitor(object):
    """System monitor class module"""

    @property
    def info(self) -> dict:
        """return all the psutil info have been collected in a dict

        boot_time
            date
            formatted_date
            days
            hours
            minutes
            seconds
        cpu
            count
            frequency
            percent
            history
            times
                user
                nice
                system
                idle
                iowait
                irq
                softirq
                steal
                guest
                guest_nice
                total
        disk
            usage
                total
                used
                free
                percent
            counters
                read_count
                write_count
                read_bytes
                write_bytes
                read_time
                write_time
                read_merged_count
                write_merged_count
                busy_time
        memory
            total
            available
            percent
            used
            free
            active
            inactive
            buffers
            cached
            shared
            slab
        net
            connections
            counters
                bytes_sent
                bytes_recv
                packets_sent
                packets_recv
                errin
                errout
                dropin
                dropout
        swap
            total
            used
            free
            percent
            sin
            sout
        temperatures
        """

        info = defaultdict
        info.update({
            'uptime': self.uptime(),
            'cpu': self.cpu(),
            'disk': self.disk(),
            'memory': self.memory(),
            'net': self.net(),
            'swap': self.swap(),
            'temperatures': self.temperatures(),
            'users': self.users()
        })

        return info

    def cpu(self):
        # cpu_count
        # cpu_freq
        # cpu_times
        # cpu_percent
        # getloadavg
        loadavg = reversed(psutil.getloadavg())
        cpu_count = psutil.cpu_count()

        cpu_times = psutil.cpu_times()._asdict()
        cpu_times['total'] = sum(cpu_times.values())
        for k in cpu_times:
            cpu_times[k] = 0 if cpu_times[k] == 0 else log(cpu_times[k])

        return {
            'count': psutil.cpu_count(),
            'frequency': psutil.cpu_freq(),
            'percent': psutil.cpu_percent(),
            'history': [a / cpu_count * 100 for a in loadavg],
            'times': cpu_times,
        }

    def disk(self, path='/'):
        # disk_io_counters
        # disk_usage
        return {
            'usage': psutil.disk_usage(path)._asdict(),
            'counters': psutil.disk_io_counters()._asdict(),
        }

    def memory(self):
        # virtual_memory
        return psutil.virtual_memory()._asdict()

    def net(self):
        # net_connections
        # net_io_counters

        connections = []
        for c in psutil.net_connections():
            #   type
            #   laddr
            #   raddr
            #   status
            #   pid

            local_ip = c.laddr.ip if isinstance(
                c.laddr, psutil._common.addr) else ''
            local_port = str(c.laddr.port) if isinstance(
                c.laddr, psutil._common.addr) else ''

            remote_ip = c.raddr.ip if isinstance(
                c.raddr, psutil._common.addr) else ''
            remote_port = str(c.raddr.ip) if isinstance(
                c.raddr, psutil._common.addr) else ''

            connections.append({
                "type": getattr(c.type, 'name', ''),
                "local_ip": local_ip,
                "local_port": local_port,
                "remote_ip": remote_ip,
                "remote_port": remote_port,
                "status": c.status,
                "pid": c.pid,
            })

        df = pd.DataFrame(connections)
        # get the local ip if the remote one is missing
        df['ip'] = df.apply(lambda row:
                            row['remote_ip'] if row['remote_ip'] != ''
                            else row['local_ip'],
                            axis=1)
        df['status'] = df['status'].str.lower()

        # groupby per ip & status
        gb = df.groupby(['ip', 'status']).size()\
            .reset_index()
        # remove the missing ip
        gb = gb[gb['ip'] != '']
        # rename the columns
        gb.columns = ['ip', 'status', 'count']

        # create the pivot table
        pt = pd.pivot_table(gb, values='count', index='ip', columns='status')
        # set all empty columns to zero
        pt = pt.fillna(0)
        # convert from float to int
        pt = pt.astype({
            c: int for c in pt.columns if c != 'status'
        })

        return {
            'connections': pt.to_dict(orient='index'),
            'counters': psutil.net_io_counters()._asdict(),
        }

    def swap(self):
        # swap_memory
        return psutil.swap_memory()._asdict()

    def temperatures(self):
        # cpu_thermal
        try:
            current = None
            temp = psutil.sensors_temperatures()
            current = temp.get('cpu_thermal')[0].current
        except (Exception,) as e:
            print(e)
        finally:
            return current

    def uptime(self, datetime_format='%d-%m-%Y %H:%M:%S'):
        # boot_time
        boot_time = psutil.boot_time()
        boot_time = datetime.datetime.fromtimestamp(boot_time)
        elapsed = datetime.datetime.now() - boot_time

        return {
            "date": boot_time,
            "formatted_date": boot_time.strftime(datetime_format),
            "days": elapsed.days,
            "hours": elapsed.seconds // 3600,
            "minutes": elapsed.seconds // 60 % 60,
            "seconds": elapsed.seconds % 60,
        }

    def users(self):
        # users

        now = datetime.datetime.now()
        res = []
        for u in psutil.users():

            started = datetime.datetime.fromtimestamp(u.started)
            elapsed = now - started

            res.append({
                **u._asdict(),
                "elapsed": {
                    "time": elapsed,
                    "days": elapsed.days,
                    "hours": elapsed.seconds // 3600,
                    "minutes": elapsed.seconds // 60 % 60,
                    "seconds": elapsed.seconds % 60,
                }
            })

        return res
