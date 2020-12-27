import React from 'react'
import _ from 'lodash'

import {
    toDecimal
    , toMemory
} from '../util'
import { INet, INetCounters } from '../interfaces'

export interface INetCountersProps {
    net?: INet
}

export const NetCounters = ({ net = {} }: INetCountersProps) => {

    const { counters = {} } = net
    const { bytes_sent, bytes_recv, packets_sent, packets_recv, errin, errout } = counters
    const nBytesSent = _.defaultTo(bytes_sent, 0)
    const nBytesRecv = _.defaultTo(bytes_recv, 0)
    const nPacketsSent = _.defaultTo(packets_sent, 0)
    const nPacktsRecv = _.defaultTo(packets_recv, 0)
    const nErrin = _.defaultTo(errin, 0)
    const nErrout = _.defaultTo(errout, 0)

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-x-0.5 text-center">
                <span className="text-xs border-b-2 border-app-green">bytes sent</span>
                <span className="text-xs border-b-2 border-app-green">packets sent</span>
                <span className="text-xs border-b-2 border-app-green">errin</span>
                <div className="text-sm">{toMemory(nBytesSent)}</div>
                <div className="text-sm">{toMemory(nPacketsSent)}</div>
                <div className="text-sm">{toDecimal(nErrin)}</div>
            </div>
            <div className="grid grid-cols-3 gap-x-0.5 text-center pt-4">
                <span className="text-xs border-b-2 border-app-green">bytes recv</span>
                <span className="text-xs border-b-2 border-app-green">packets recv</span>
                <span className="text-xs border-b-2 border-app-green">errout</span>
                <div className="text-sm">{toMemory(nBytesRecv)}</div>
                <div className="text-sm">{toMemory(nPacktsRecv)}</div>
                <div className="text-sm">{toDecimal(nErrout)}</div>
            </div>
        </div>
    )
}