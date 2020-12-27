import React from 'react'
import _ from 'lodash'

import { TUsers } from '../interfaces'

export interface IUsersProps {
    users?: TUsers
}

export const Users = ({ users = [] }: IUsersProps) => {
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
                    users.map(user => {
                        const { name, host, pid, elapsed } = user
                        const { days, hours, minutes, seconds } = _.defaultTo(elapsed, {})
                        const textSeconds: string = _.defaultTo(seconds, '0').toString()
                        const paddedSeconds: string = _.padStart(textSeconds, 2, '0')

                        return (
                            <React.Fragment key={pid}>
                                <span className="text-xs pr-2">{name}</span>
                                <span className="text-xs pr-2">{host}</span>
                                <span className="text-xs pr-2">{pid}</span>
                                <div className='text-xs whitespace-nowrap pr-2'>
                                    <span className="text-xs" style={{ paddingLeft: 1 }}>{days}</span>d
                                    <span className="text-xs" style={{ paddingLeft: 1 }}>{hours}</span>h
                                    <span className="text-xs" style={{ paddingLeft: 1 }}>{minutes}</span>m
                                    <span className="text-xs" style={{ paddingLeft: 1 }}>{paddedSeconds}</span>s
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}