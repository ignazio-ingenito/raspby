import React from 'react'
import _ from 'lodash'

import { toDecimal, toMemory } from '../util'
import { IDisk } from '../interfaces'

interface IDiskCountersProps {
    disk?: IDisk
}

export const DiskCounters = ({ disk = {} }: IDiskCountersProps) => {
    const { counters = {} } = disk
    const { read_count, read_time, read_bytes, write_count, write_time, write_bytes } = counters

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-x-0.5 text-center">
                <span className="text-xs border-b-2 border-app-green">read count</span>
                <span className="text-xs border-b-2 border-app-green">read time</span>
                <span className="text-xs border-b-2 border-app-green">read bytes</span>
                <div className="text-sm">{toDecimal(read_count)}</div>
                <div className="text-sm">{read_time || ''}ms</div>
                <div className="text-sm">{toMemory(read_bytes)}</div>
            </div>
            <div className="grid grid-cols-3 gap-x-0.5 text-center pt-4">
                <span className="text-xs border-b-2 border-app-green">write count</span>
                <span className="text-xs border-b-2 border-app-green">write time</span>
                <span className="text-xs border-b-2 border-app-green">write bytes</span>
                <div className="text-sm">{toDecimal(write_count)}</div>
                <div className="text-sm">{write_time || ''}ms</div>
                <div className="text-sm">{toMemory(write_bytes)}</div>
            </div>
        </div>
    )
}