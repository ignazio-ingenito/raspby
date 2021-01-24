import React, {useEffect, useRef} from "react"

export const Clock = () => {
    const refCanvas = useRef<HTMLCanvasElement>(null)
    const refTimer = useRef<number>(0)

     const degreesToRadians = (degrees: number, offsetAngle: number = 0) => {
      return ( Math.PI/180 ) * (degrees + offsetAngle)
    }

    const map = (
        value: number,
        inStart: number,
        inStop: number  ,
        outStart: number,
        outStop: number
    ) : number => outStart + (outStop - outStart) * ((value - inStart) / (inStop - inStart))

    const getHands = (origin: number[], radius: number, deg: number, offsetAngle: number = 0): number[] => {

        const [originX, originY] = origin
        const rad = ( Math.PI/180 ) * (deg + offsetAngle)

        const x: number = originX + (radius * Math.cos(rad))
        const y: number = originY + (radius * Math.sin(rad))
        return [x, y]
    }

    const updateClock = () => requestAnimationFrame(updateClockEx)

    const updateClockEx = () => {
        const date = new Date()
        const offsetAngle = - 90
        const colorHours = "rgba(139, 195, 74, 1)"
        const colorMinutes = "rgba(150, 100, 255, 1)"
        const colorSeconds = "rgba(233, 30, 99, 1)"

        const hrs = date.getHours()
        const min = date.getMinutes()
        const sec = date.getSeconds()
        const msec = date.getMilliseconds()
        const hoursDeg = map(hrs % 12, 0, 12, 0, 360)
        const minutesDeg = map(min, 0, 60, 0, 360)
        const secondsDeg = map(sec, 0, 60, 0, 360)
        const millisecondsDeg = map(msec, 0, 1000, 0, 360)
        const hours = degreesToRadians(hoursDeg, offsetAngle)
        const minutes = degreesToRadians(minutesDeg, offsetAngle)
        const seconds = degreesToRadians(secondsDeg, offsetAngle)
        const msecStart = degreesToRadians(millisecondsDeg, offsetAngle - 10)
        const msecEnd = degreesToRadians(millisecondsDeg, offsetAngle + 10)
        const start = degreesToRadians(0, offsetAngle)
        
        const h = refCanvas.current?.parentElement?.clientHeight || 0
        const w = refCanvas.current?.parentElement?.clientWidth || 0
        const originX = w / 2
        const originY = (h / 2.5) + 8
        const radius = h / 2.7

        const ctx = refCanvas.current?.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, w, h)
        ctx.imageSmoothingEnabled = true
        ctx.canvas.width = w
        ctx.canvas.height = h

        // hours
        ctx.lineWidth = 4
        ctx.strokeStyle = colorHours
        ctx.beginPath()
        ctx.arc(originX, originY + 30, radius - 15, start, hours, false)
        ctx.moveTo(originX, originY + 30)
        const [xHrs, yHrs] = getHands([originX, originY + 30], radius - 40, hoursDeg, -90)
        ctx.lineTo(xHrs, yHrs)
        ctx.stroke()

        // minutes
        ctx.strokeStyle = colorMinutes
        ctx.beginPath()
        ctx.arc(originX, originY + 30, radius - 10, start, minutes, false)
        ctx.moveTo(originX, originY + 30)
        const [xMin, yMin] = getHands([originX, originY + 30], radius - 30, minutesDeg, -90)
        ctx.lineTo(xMin, yMin)
        ctx.stroke() 

        // seconds
        ctx.strokeStyle = colorSeconds
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(originX, originY + 30, radius - 5, start, seconds, false)
        ctx.moveTo(originX, originY + 30)
        const [xSec, ySec] = getHands([originX, originY + 30], radius - 20, secondsDeg, -90)
        ctx.lineTo(xSec, ySec)
        ctx.stroke()
  
        // milliseconds
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.75)"
        ctx.arc(originX, originY + 30, radius - 4, msecStart, msecEnd, false)
        ctx.stroke()     

        // clock notch
        ctx.beginPath()
        ctx.lineWidth = 3
        ctx.strokeStyle = "rgba(25, 30, 50, 1)"
        ctx.fillStyle = "rgba(35, 40, 60, 1)"
        ctx.arc(originX, originY + 30, 3, 0, 2 * Math.PI, false)
        ctx.stroke()
        ctx.fill()

        // time text
        ctx.lineWidth = 2
        ctx.fillStyle = "rgba(255, 255, 255, 1)"
        ctx.font = "25px Monda"
        ctx.fillText(":", originX - 20, originY - 60)
        ctx.fillText(".", originX + 20, originY - 60)
        ctx.fillStyle = colorHours
        const textHrs = `${hrs.toString().padStart(2, "0")}`
        ctx.fillText( textHrs.toString(), originX - 50, originY - 60 )
        ctx.fillStyle = colorMinutes
        const textMin = `${min.toString().padStart(2, "0")}`
        ctx.fillText( textMin.toString(), originX - 10, originY - 60 )
        ctx.fillStyle = colorSeconds
        const textSec = `${sec.toString().padStart(2, "0")}`
        ctx.fillText( textSec.toString(), originX + 28, originY - 60)
    }

    useEffect(() => {
        refTimer.current = window.setInterval(updateClock, 50)

        return () => {
            clearInterval(refTimer.current)
        }
    }, [])

    return (
        <canvas ref={refCanvas} className="w-full h-full" />
    )
}