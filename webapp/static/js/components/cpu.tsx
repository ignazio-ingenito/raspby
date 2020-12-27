import React from 'react'
import _ from 'lodash'

import { ICpu } from '../interfaces'
import { toFrequency } from "../util"

export interface ICpuProps {
    cpu?: ICpu
}

export const Cpu = ({ cpu = {} }: ICpuProps) => {

    const { count = 0, frequency = [] } = cpu
    const [current = 0, min = 0, max = 100] = frequency

    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div>
                    <span className="text-5xl">{count}</span>
                    <span>CPUs</span>
                </div>
                <div className="ml-4">
                    <span className="text-5xl">{current.toFixed(0)}</span>
                    <span>MHz</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-0.5 text-center pt-4">
                <span className="text-xs border-b-2 border-app-green">Min</span>
                <span className="text-xs border-b-2 border-app-green">Max</span>
                <div className="text-sm">{toFrequency(min)}</div>
                <div className="text-sm">{toFrequency(max)}</div>
            </div>
        </div>
    )
}