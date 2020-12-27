import React from 'react'
import _ from 'lodash'

import { toMemory } from '../util'
import { ISwap } from '../interfaces'

export interface ISwapProps {
    swap?: ISwap
}

export const Swap = ({ swap = {} }: ISwapProps) => {
    const { percent = 0, used, free, total } = swap

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
                <div className="text-sm">{toMemory(_.defaultTo(used, 0))}</div>
                <div className="text-sm">{toMemory(_.defaultTo(free, 0))}</div>
                <div className="text-sm">{toMemory(_.defaultTo(total, 0))}</div>
            </div>
        </div>
    )
}