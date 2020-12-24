import React from 'react'
import _ from 'lodash'


export const Connections = ({connections}) => {
    
    if (connections.length <= 0) return <span>No connections</span>

    return (
        <div className="flex flex-col absolute">
            <div className="grid gap-x-0.5 text-center" 
                style={{
                    gridTemplateColumns: 'repeat(5, min-content)',
                }}>
                <span className="text-xs border-b-2 border-app-green whitespace-nowrap">ip</span>
                <span className="text-xs border-b-2 border-app-green whitespace-nowrap">established</span>
                <span className="text-xs border-b-2 border-app-green whitespace-nowrap">listen</span>
                <span className="text-xs border-b-2 border-app-green whitespace-nowrap">time wait</span>
                <span className="text-xs border-b-2 border-app-green whitespace-nowrap">none</span>
                {
                    Object.entries(connections)
                        .filter(([ip, e]) => ip.length > 4)
                        .filter(([ip, e]) => _(e).values().sum() > 0)
                        .map(([ip, e]) => {
                            const established = _.get(e, 'established', '').toString().replace('0', '')
                            const listen = _.get(e, 'listen', '').toString().replace('0', '')
                            const time_wait = _.get(e, 'time_wait', '').toString().replace('0', '')
                            const none = _.get(e, 'none', '').toString().replace('0', '')
                            
                            return (
                                <React.Fragment key={ip}>
                                    <span className="text-xs pr-2 text-left">{ip}</span>
                                    <span className="text-xs pr-2">{established}</span>
                                    <span className="text-xs pr-2">{listen}</span>
                                    <span className="text-xs pr-2">{time_wait}</span>
                                    <span className="text-xs pr-2">{none}</span>
                                </React.Fragment>
                            )
                        })
                }
            </div>
        </div>
    )
}