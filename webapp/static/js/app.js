import React, { Suspense } from "react"
import ReactDom from "react-dom"
import { SWRConfig } from "swr"

// Custom components
import { useRequest, fetcher } from "./components/swr"
import { Connections } from "./components/connections"
import { Cpu } from "./components/cpu"
import { CpuCounters } from "./components/cpuCounters"
import { Disk } from "./components/disk"
import { DiskCounters } from "./components/diskCounters"
import { Load } from "./components/load"
import { Memory } from "./components/memory"
import { MemoryCounters } from "./components/memoryCounters"
import { NetCounters } from "./components/netCounters"
import { Spinner } from "./components/spinner"
import { Swap } from "./components/swap"
import { Temp } from "./components/temp"
import { Tile } from "./components/tile"
import { Uptime } from "./components/uptime"
import { Users } from "./components/users"

const App = () => {
    const {data, error} = useRequest('/info', null, {
        refreshInterval: 5000, 
        suspense: true
    })
    
    if (error) return <div className="error">{error}</div>

    const uptime = _.get(data, 'uptime')
    const load = _.get(data, 'cpu.percent')
    const history = _.get(data, 'cpu.history')
    const temp = _.get(data, 'temperatures')
    const cpu = _.get(data, 'cpu')
    const memory = _.get(data, 'memory')
    const swap = _.get(data, 'swap')
    const disk = _.get(data, 'disk')
    const users = _.get(data, 'users')
    const connections = _.get(data, 'net.connections')
    const net = _.get(data, 'net')
    
    return (
        <>
            <Tile title="Uptime" body={<Uptime uptime={uptime} />}/>
            <Tile title="Load" body={<Load load={load} history={history} />}/>
            <Tile title="Temp" body={<Temp temp={temp}/>}/>
            <Tile title="Cpu" body={<Cpu cpu={cpu}/>}/>
            <Tile title="Memory" body={<Memory memory={memory}/>}/>
            <Tile title="Swap" body={<Swap swap={swap}/>}/>
            <Tile title="Disk" body={<Disk disk={disk} />}/>
            <Tile title="Cpu Times" body={<CpuCounters cpu={cpu} />}/>
            <Tile title="Memory" body={<MemoryCounters memory={memory} />}/>
            <Tile title="Disk stats" body={<DiskCounters disk={disk} />}/>
            <Tile title="Net counters" body={<NetCounters net={net} />}/>
            <Tile title="Users" body={<Users users={users}/>}/>
            <Tile title="Connections" body={<Connections connections={connections}/> }/>
        </>
    )
}

ReactDom.render(
    <React.StrictMode>
        <SWRConfig value={{ fetcher: fetcher }}>
            <Suspense fallback={<Spinner />}>
                <App />
            </Suspense>
        </SWRConfig>
    </React.StrictMode>, 
    document.getElementById('app')
)