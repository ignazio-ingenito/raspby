import React from 'react'
import _ from 'lodash'

import { toMemory } from '../util'
import { IMemory } from '../interfaces'

export interface IMemoryCountersProps {
    memory?: IMemory
}

export const MemoryCounters = ({ memory = {} }: IMemoryCountersProps) => {
    const { active, inactive, buffers, cached, shared, slab } = memory

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-x-0.5 text-center">
                <span className="text-xs border-b-2 border-app-green">active</span>
                <span className="text-xs border-b-2 border-app-green">inactive</span>
                <span className="text-xs border-b-2 border-app-green">buffers</span>
                <div className="text-sm">{toMemory(active)}</div>
                <div className="text-sm">{toMemory(inactive)}</div>
                <div className="text-sm">{toMemory(buffers)}</div>
            </div>
            <div className="grid grid-cols-3 gap-x-0.5 text-center pt-4">
                <span className="text-xs border-b-2 border-app-green">cached</span>
                <span className="text-xs border-b-2 border-app-green">shared</span>
                <span className="text-xs border-b-2 border-app-green">slab</span>
                <div className="text-sm">{toMemory(cached)}</div>
                <div className="text-sm">{toMemory(shared)}</div>
                <div className="text-sm">{toMemory(slab)}</div>
            </div>
        </div>
    )
}