import React from 'react'
import _ from 'lodash'

import { dec, memory as mem } from './util'

export const NetCounters = ({ net}) => {
    const bytes_sent = _.get(net, 'counters.bytes_sent')
    const packets_sent = _.get(net, 'counters.packets_sent')
    const errin = _.get(net, 'counters.errin')
    const bytes_recv = _.get(net, 'counters.bytes_recv')
    const packets_recv = _.get(net, 'counters.packets_recv')
    const errout = _.get(net, 'counters.errout')

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-x-0.5 text-center">
                <span className="text-xs border-b-2 border-app-green">bytes sent</span>
                <span className="text-xs border-b-2 border-app-green">packets sent</span>
                <span className="text-xs border-b-2 border-app-green">errin</span>
                <div className="text-sm">{mem(bytes_sent)}</div>
                <div className="text-sm">{mem(packets_sent)}</div>
                <div className="text-sm">{dec(errin)}</div>
            </div>
            <div className="grid grid-cols-3 gap-x-0.5 text-center pt-4">
                <span className="text-xs border-b-2 border-app-green">bytes recv</span>
                <span className="text-xs border-b-2 border-app-green">packets recv</span>
                <span className="text-xs border-b-2 border-app-green">errout</span>
                <div className="text-sm">{mem(bytes_recv)}</div>
                <div className="text-sm">{mem(packets_recv)}</div>
                <div className="text-sm">{dec(errout)}</div>
            </div>
        </div>
    )
}