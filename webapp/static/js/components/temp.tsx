import React from 'react'
import _ from 'lodash'

import { TTemperature } from '../interfaces'

export interface ITemperatureProps {
    temperature?: TTemperature
}

export const Temp = ({ temperature = 0 }: ITemperatureProps) => {
    return <span className="text-5xl">{temperature.toFixed(1)}&deg;C</span>
}
