import React from 'react'
import _ from 'lodash'

import { dec, memory as mem } from './util'

export const DiskCounters = ({disk}) => {
    const readCount = _.get(disk, 'counters.read_count')
    const readTime = _.get(disk, 'counters.read_time')
    const readBytes = _.get(disk, 'counters.read_bytes')
    const writeCount = _.get(disk, 'counters.write_count')
    const writeTime = _.get(disk, 'counters.write_time')
    const writeBytes = _.get(disk, 'counters.write_bytes')

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-x-0.5 text-center">
                <span className="text-xs border-b-2 border-app-green">read count</span>
                <span className="text-xs border-b-2 border-app-green">read time</span>
                <span className="text-xs border-b-2 border-app-green">read bytes</span>
                <div className="text-sm">{dec(readCount)}</div>
                <div className="text-sm">{readTime}ms</div>
                <div className="text-sm">{mem(readBytes)}</div>
            </div>
            <div className="grid grid-cols-3 gap-x-0.5 text-center pt-4">
                <span className="text-xs border-b-2 border-app-green">write count</span>
                <span className="text-xs border-b-2 border-app-green">write time</span>
                <span className="text-xs border-b-2 border-app-green">write bytes</span>
                <div className="text-sm">{dec(writeCount)}</div>
                <div className="text-sm">{writeTime}ms</div>
                <div className="text-sm">{mem(writeBytes)}</div>
            </div>
        </div>
    )
}