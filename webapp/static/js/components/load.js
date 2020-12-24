import React from 'react'
import { useEffect, useRef } from 'react'
import Chart from 'chart.js'

export const Load = ({load, history}) => {
    const labels = [1, 5, 15]
    const chartRef = useRef()

    Chart.defaults.global.tooltips.enabled = false
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.title.display = false
    Chart.defaults.global.elements.point.hoverRadius = 1
    Chart.defaults.global.animation.duration = 0

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d')

        new Chart(ctx, {
            type: 'line',
            title: {
                display: false,
            },
            data: {
                labels: labels,
                datasets: [{
                    fill: 'origin',
                    data: history,
                    borderColor: 'rgba(185, 230, 85, 1)',
                    borderWidth: 1,
                    pointRadius: 1,
                    lineTension: 0,
                    backgroundColor: 'rgba(185, 230, 85, .1)'
                }],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,                
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 100,
                        },
                        display: false,
                    }]
                }
            },
        })
    }, [history])

    const height = 130
    const width = 130
    const styleCanvas = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1,
    }

    return (
        <>
            <div className="load">
                <div className="h-full text-5xl">{load}%</div>
            </div>
            <canvas ref={chartRef} style={styleCanvas} height={height} width={width}></canvas>
        </>
    )
}