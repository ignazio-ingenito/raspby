import React from 'react'
import _ from 'lodash'

import { toMemory } from '../util'
import { IMemory } from '../interfaces'

interface IMemoryProps {
    memory?: IMemory
}

export const Memory = ({ memory = {} }: IMemoryProps) => {
    const { percent = 0, used, free, total } = memory

    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div>
                    <span className="text-5xl">{percent.toFixed(1)}%</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-x-0.5 text-center pt-4">
                <span className="text-xs border-b-2 border-app-green">Used</span>
                <span className="text-xs border-b-2 border-app-green">Free</span>
                <span className="text-xs border-b-2 border-app-green">Total</span>
                <div className="text-sm">{toMemory(used)}</div>
                <div className="text-sm">{toMemory(free)}</div>
                <div className="text-sm">{toMemory(total)}</div>
            </div>
        </div>
    )
}