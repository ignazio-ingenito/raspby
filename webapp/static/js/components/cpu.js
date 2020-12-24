import React from 'react'
import _ from 'lodash'

import { frequency } from './util'

export const Cpu = ({cpu}) => {
    const [current, min, max] = _.get(cpu, 'frequency', ['', '', ''])
    const count = _.get(cpu, 'count')

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
                <div className="text-sm">{frequency(min)}</div>
                <div className="text-sm">{frequency(max)}</div>
            </div>
        </div>
    )
}