import React from "react"
import _ from 'lodash'

export const Uptime = ({uptime}) => {

    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-nowrap justify-end pr-4">
                <div><span className="text-5xl ml-2">{uptime.days}</span><span className="text-xl">d</span></div>
                <div><span className="text-5xl ml-2">{uptime.hours}</span><span className="text-xl">h</span></div>
                <div><span className="text-5xl ml-2">{_.padStart(uptime.minutes, 2, '0')}</span><span className="text-xl">m</span></div>
                <div><span className="text-5xl ml-2">{_.padStart(uptime.seconds, 2, '0')}</span><span className="text-xl">s</span></div>
            </div>
            <div>
                <div className="text-sm text-right pr-4"><span>{uptime.formatted_date}</span></div>
            </div>
        </div>
    )
}