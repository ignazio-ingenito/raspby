import React from 'react'
import _ from 'lodash'

import { memory as mem } from './util'

export const MemoryCounters = ({memory}) => {
    const active = _.get(memory, 'active')
    const inactive = _.get(memory, 'inactive')
    const buffers = _.get(memory, 'buffers')
    const cached = _.get(memory, 'cached')
    const shared = _.get(memory, 'shared')
    const slab = _.get(memory, 'slab')

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-x-0.5 text-center">
                <span className="text-xs border-b-2 border-app-green">active</span>
                <span className="text-xs border-b-2 border-app-green">inactive</span>
                <span className="text-xs border-b-2 border-app-green">buffers</span>
                <div className="text-sm">{mem(active)}</div>
                <div className="text-sm">{mem(inactive)}</div>
                <div className="text-sm">{mem(buffers)}</div>
            </div>
            <div className="grid grid-cols-3 gap-x-0.5 text-center pt-4">
                <span className="text-xs border-b-2 border-app-green">cached</span>
                <span className="text-xs border-b-2 border-app-green">shared</span>
                <span className="text-xs border-b-2 border-app-green">slab</span>
                <div className="text-sm">{mem(cached)}</div>
                <div className="text-sm">{mem(shared)}</div>
                <div className="text-sm">{mem(slab)}</div>
            </div>
        </div>
    )
}