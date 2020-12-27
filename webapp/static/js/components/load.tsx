import React from 'react'
import _ from 'lodash'

import { useEffect, useRef } from 'react'
import { TCpuLoadHistory, TCoordinate, TCoordinates, ICpu } from '../interfaces'

let canvas: HTMLCanvasElement | any = null
let context: CanvasRenderingContext2D | any = null

interface ILoadProps {
    cpu?: ICpu,
}

export const Load = ({ cpu = {} }: ILoadProps) => {
    const chartRef = useRef<HTMLCanvasElement>(null)
    const { percent = 0, history = [] } = cpu

    const drawLine = (coordinates: TCoordinates) => {
        if (context == null) return
        context.beginPath()
        context.lineWidth = 2
        context.strokeStyle = '#b9e655'

        coordinates.map((coordinate, n) => {
            if (context == null) return
            (n == 0) ? context.moveTo(coordinate.x, coordinate.y) : context.lineTo(coordinate.x, coordinate.y)
        })
        context.stroke()
    }

    const drawArea = (coordinates: TCoordinates) => {
        if (canvas == null) return
        if (context == null) return
        context.beginPath()
        context.fillStyle = 'rgba(185, 230, 85, .1)'

        coordinates.map((coordinate, n) => {
            if (context == null) return
            (n == 0) ? context.moveTo(coordinate.x, coordinate.y) : context.lineTo(coordinate.x, coordinate.y)
        })

        context.lineTo(canvas.width, 0)
        context.lineTo(0, 0)
        context.closePath()
        context.fill()
    }

    useEffect(() => {
        if (chartRef.current == null) return

        canvas = chartRef.current
        context = canvas.getContext('2d')
        context.transform(1, 0, 0, -1, 0, canvas.height)
    }, [])

    useEffect(() => {
        if (context == null) return

        const plot: TCoordinates = history
            .map<TCoordinate>((y, n) => ({ x: n / (history.length - 1), y: y / 100 }))
            .map<TCoordinate>(e => ({ x: e.x * canvas.width, y: e.y * canvas.height }))

        // clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height)

        drawLine(plot)
        drawArea(plot)

    }, [history])

    return (
        <>
            <div className="load" data-load={`${percent}%`}>
                <canvas ref={chartRef} height="130px" width="300px"></canvas>
            </div>
        </>
    )
}