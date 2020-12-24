import React from 'react'
import _ from 'lodash'


export const Users = ({users}) => {
    
    if (users.length <= 0) return <span>No users connected</span>

    return (
        <div className="flex flex-col absolute top-2">
            <div className="grid gap-x-0.5 text-center" 
                style={{
                    gridTemplateColumns: 'repeat(4, min-content)',
                }}>
                <span className="text-xs border-b-2 border-app-green">name</span>
                <span className="text-xs border-b-2 border-app-green">host</span>
                <span className="text-xs border-b-2 border-app-green">pid</span>
                <span className="text-xs border-b-2 border-app-green">started</span>
                {
                    users.map(e => {
                        const name = _.get(e, 'name')
                        const host = _.get(e, 'host')
                        const pid = _.get(e, 'pid')
                        const days = _.get(e, 'elapsed.days')
                        const hours = _.get(e, 'elapsed.hours')
                        const minutes = _.get(e, 'elapsed.minutes')
                        const seconds = _.get(e, 'elapsed.seconds')
                        
                        return (
                            <React.Fragment key={pid}>
                                <span className="text-xs pr-2">{name}</span>
                                <span className="text-xs pr-2">{host}</span>
                                <span className="text-xs pr-2">{pid}</span>
                                <div className='text-xs whitespace-nowrap pr-2'>
                                    <span className="text-xs" style={{paddingLeft: 1}}>{days}</span>d
                                    <span className="text-xs" style={{paddingLeft: 1}}>{hours}</span>h
                                    <span className="text-xs" style={{paddingLeft: 1}}>{minutes}</span>m
                                    <span className="text-xs" style={{paddingLeft: 1}}>{_.padStart(seconds, 2, '0')}</span>s
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}