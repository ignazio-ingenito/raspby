import React from "react"
import _ from 'lodash'
import { IUptime } from "../interfaces"


interface IUptimeProps {
    uptime?: IUptime
}

export const Uptime = ({ uptime = {} }: IUptimeProps) => {

    const { formatted_date = '', days = '', hours = '', minutes = '', seconds = '' } = uptime

    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-nowrap justify-end pr-4">
                <div><span className="text-5xl ml-2">{days}</span><span className="text-xl">d</span></div>
                <div><span className="text-5xl ml-2">{hours}</span><span className="text-xl">h</span></div>
                <div><span className="text-5xl ml-2">{_.padStart(minutes.toString(), 2, '0')}</span><span className="text-xl">m</span></div>
                <div><span className="text-5xl ml-2">{_.padStart(seconds.toString(), 2, '0')}</span><span className="text-xl">s</span></div>
            </div>
            <div>
                <div className="text-sm text-right pr-4"><span>{formatted_date}</span></div>
            </div>
        </div>
    )
}