import React from 'react'
import _ from 'lodash'

import { ICpu } from '../interfaces'

interface ICpuCounters {
    cpu?: ICpu
}

export const CpuCounters = ({ cpu }: ICpuCounters) => {

    const groups = [
        ['user', 'nice', 'system', 'idle', 'iowait'],
        ['irq', 'softirq', 'steal', 'guest', 'guest_nice'],
    ]

    const { times = {} } = cpu || {}

    return (
        <div className="grid grid-cols-4 items-center gap-x-4 gap-y-0.5"
            style={{ gridTemplateColumns: "repeat(2, min-content 70px)" }}   >
            {
                groups.map(keys => {
                    return (
                        keys.map(key => {
                            const val = _.get(times, `${key}`)
                            return (
                                <React.Fragment key={key}>
                                    <div className="text-xs" key={key}>{key}</div>
                                    <Progress value={val} foreColor='#b9e655' showPerc={false} />
                                </React.Fragment>
                            )
                        })
                    )
                })
            }
        </div>
    )
}

export interface IProgressProps {
    value: number,
    min?: number,
    max?: number,
    height?: number,
    bgColor?: string,
    foreColor?: string,
    showPerc?: boolean,
}

const Progress = ({ value, min = 0, max = 100, height = 3, bgColor = 'gray', foreColor = 'blue', showPerc = true }: IProgressProps) => {
    const perc = value / (max - min) * 100

    return (
        <div className="w-full rounded-sm relative" style={{ height: height, backgroundColor: bgColor }}>
            <div className="h-full rounded-sm" style={{ width: `${perc}%`, backgroundColor: foreColor }}></div>
            {showPerc && <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">{perc.toFixed(1)}%</div>}
        </div>
    )
}