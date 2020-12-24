import React from 'react'
import _ from 'lodash'

import { memory as mem } from './util'

export const Memory = ({memory}) => {
    const percent = _.get(memory, 'percent')
    const used = _.get(memory, 'used')
    const free = _.get(memory, 'free')
    const total = _.get(memory, 'total')

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
                <div className="text-sm">{mem(used)}</div>
                <div className="text-sm">{mem(free)}</div>
                <div className="text-sm">{mem(total)}</div>
            </div>
        </div>
    )
}