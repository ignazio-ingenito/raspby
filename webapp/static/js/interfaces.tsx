export type TCpuLoad = number
export type TCpuLoadHistory = TCpuLoad[]
export type TCoordinates = TCoordinate[]
export type TCoordinate = { x: number, y: number }
export type TTemperature = number

export interface IInfo {
    cpu?: ICpu,
    disk?: IDisk,
    memory?: IMemory,
    net?: INet,
    swap?: ISwap,
    temperatures?: TTemperature,
    uptime?: IUptime,
    users?: TUsers,
}

export interface ICpu {
    history?: number[],
    percent?: number,
    count?: number,
    frequency?: number[],
    times?: ICpuTimes,
}

export interface ICpuTimes {
    user?: number,
    nice?: number,
    system?: number,
    idle?: number,
    iowait?: number,
    irq?: number,
    softirq?: number,
    steal?: number,
    guest?: number,
    guest_nice?: number,
    total?: number,
}

export interface IDisk {
    usage?: IDiskUsage,
    counters?: IDiskCounters,
}

export interface IDiskCounters {
    read_count?: number,
    write_count?: number,
    read_bytes?: number,
    write_bytes?: number,
    read_time?: number,
    write_time?: number,
    read_merged_count?: number,
    write_merged_count?: number,
    busy_time?: number,
}

export interface IDiskUsage {
    total?: number,
    used?: number,
    free?: number,
    percent?: number,
}

export interface IMemory {
    total?: number,
    available?: number,
    percent?: number,
    used?: number,
    free?: number,
    active?: number,
    inactive?: number,
    buffers?: number,
    cached?: number,
    shared?: number,
    slab?: number
}

export interface INet {
    connections?: INetConnections,
    counters?: INetCounters
}


export interface INetCounters {
    bytes_sent?: number,
    bytes_recv?: number,
    packets_sent?: number,
    packets_recv?: number,
    errin?: number,
    errout?: number,
    dropin?: number,
    dropout?: number
}

export interface INetConnections {
    [ip: string]: INetConnection
}

export interface INetConnection {
    established?: number,
    listen?: number,
    none?: number,
    time_wait?: number,
}

export interface ISwap {
    percent?: number,
    used?: number,
    free?: number,
    total?: number,
}

export interface IUptime {
    date?: string,
    formatted_date?: string,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number
}

export type TUsers = IUser[]

export interface IUser {
    name?: string,
    terminal?: string,
    host?: string,
    started?: number,
    pid?: number,
    elapsed?: IUserElapsed
}

export interface IUserElapsed {
    time?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
}