import React from 'react'
import { useEffect, useRef } from 'react'

let canvas = null
let context = null

export const Load = ({load, history}) => {
    const chartRef = useRef()

    const drawLine = plot => {
        context.beginPath() 
        context.lineWidth = 2
        context.strokeStyle = '#b9e655'
        
        plot.map(([x, y], n) => (n == 0) ? context.moveTo(x, y) : context.lineTo(x, y))
        context.stroke()
    }

    const drawArea = plot => {
        context.beginPath() 
        context.fillStyle = 'rgba(185, 230, 85, .1)'
        
        plot.map(([x, y], n) => (n == 0) ? context.moveTo(x, y) : context.lineTo(x, y))
        context.lineTo(canvas.width, 0)
        context.lineTo(0, 0)

        context.closePath()        
        context.fill()        
    }

    useEffect(() => {
        canvas = chartRef.current
        context = chartRef.current.getContext('2d')

        context.transform(1, 0, 0, -1, 0, canvas.height)
    }, [])

    useEffect(() => {
        const plot = history
            .map((y, n) => [n / (history.length-1), y / 100])
            .map(([x, y]) => [x * canvas.width, y * canvas.height])        
    
        // clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height)

        drawLine(plot)
        drawArea(plot)

    }, [history])

    return (
        <>
            <div className="load" data-load={`${load}%`}>
                <canvas ref={chartRef} height="300px" height="130px"></canvas>
            </div>
        </>
    )
}