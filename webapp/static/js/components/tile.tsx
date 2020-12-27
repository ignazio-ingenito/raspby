import React from "react"

export interface ITile {
    title?: String,
    body?: JSX.Element,
}

export const Tile = ({ title = '', body }: ITile) => {

    return (
        <div className="flex flex-col text-sm bg-app-blue-light shadow-sm rounded divide-y-2 divide-current divide-app-blue-dark relative"
            style={{ minWidth: '320px', minHeight: '200px' }}>
            <div className="flex-grow-0 flex justify-center items-center p-4 text-2xl">{title}</div>
            <div className="flex-grow flex justify-center items-center relative">{body}</div>
        </div>
    )
}