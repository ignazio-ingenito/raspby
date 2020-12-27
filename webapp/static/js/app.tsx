import React, { Suspense } from "react"
import ReactDom from "react-dom"
import axios from "axios"

import _ from 'lodash'

// Custom components
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
import useSWR, { SWRConfig } from "swr"

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const App = () => {
    const { data, error } = useSWR('/info', fetcher, { refreshInterval: 1000, suspense: true })

    if (error) return <span>{error}</span>
    const { cpu = {}, disk = {}, memory = {}, net = {}, swap = {}, temperatures = 0, uptime = {}, users = [] } = data

    return (
        <span>
            <Tile title="Uptime" body={<Uptime uptime={uptime} />} />
            <Tile title="Load" body={<Load cpu={cpu} />} />
            <Tile title="Temp" body={<Temp temperature={temperatures} />} />
            <Tile title="Cpu" body={<Cpu cpu={cpu} />} />
            <Tile title="Memory" body={<Memory memory={memory} />} />
            <Tile title="Swap" body={<Swap swap={swap} />} />
            <Tile title="Disk" body={<Disk disk={disk} />} />
            <Tile title="Cpu Times" body={<CpuCounters cpu={cpu} />} />
            <Tile title="Memory" body={<MemoryCounters memory={memory} />} />
            <Tile title="Disk stats" body={<DiskCounters disk={disk} />} />
            <Tile title="Net counters" body={<NetCounters net={net} />} />
            <Tile title="Users" body={<Users users={users} />} />
            <Tile title="Connections" body={<Connections net={net} />} />
        </span>
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