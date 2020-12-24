import React from 'react'

export const Temp = ({temp}) => {
    return <span className="text-5xl">{temp.toFixed(1)}&deg;C</span>
}
