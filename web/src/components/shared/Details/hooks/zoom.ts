import { DragEvent, useRef, useState, WheelEvent } from 'react'

export const useZoom = () => {
    const zoomRef = useRef<HTMLDivElement>(null)
    const [zoomLevel, setZoomLevel] = useState(0)
    const [zoomCenter, setZoomCenter] = useState([0, 0])
    const zoom = (event?: WheelEvent) => {
        const maxZoom = 4
        const newZoomLevel = Math.min(Math.max(0, zoomLevel + (event?.deltaY ?? 0) / -1000), maxZoom)

        if (newZoomLevel === 1) {
            setZoomCenter([0, 0])
        }

        setZoomLevel(newZoomLevel)

        const percentDistance = (event?.deltaY ?? 0) / 2000

        const size = {
            x: zoomRef.current.clientWidth,
            y: zoomRef.current.clientHeight
        }

        const maxPossibleOffset = {
            x: size.x / 2 * (maxZoom + 1) - size.x / 2 - zoomRef.current.offsetLeft,
            y: size.y / 2 * (maxZoom + 1) - size.y / 2 - zoomRef.current.offsetTop
        }

        const atThisPositionMaxPossibleOffset = {
            x: maxPossibleOffset.x * (newZoomLevel / maxZoom),
            y: maxPossibleOffset.y * (newZoomLevel / maxZoom)
        }

        const max = {
            x: size.x,
            y: size.y
        }

        const diff = {
            x: max.x * percentDistance,
            y: max.y * percentDistance
        }

        const pos = {
            x: (event?.clientX || 0) - zoomRef.current.offsetLeft - size.x / 2,
            y: (event?.clientY || 0) - zoomRef.current.offsetTop - size.y / 2
        }

        const cursorClamp = {
            x: Math.max(Math.min(pos.x, size.x / 2), size.x / -2),
            y: Math.max(Math.min(pos.y, size.y / 2), size.y / -2)
        }

        const multiplier = {
            x: cursorClamp.x / (size.x / 2),
            y: cursorClamp.y / (size.y / 2)
        }

        const value = {
            x: zoomCenter[0] + diff.x * multiplier.x,
            y: zoomCenter[1] + diff.y * multiplier.y
        }

        const clamp = {
            x: Math.max(Math.min(value.x, atThisPositionMaxPossibleOffset.x), atThisPositionMaxPossibleOffset.x * -1),
            y: Math.max(Math.min(value.y, atThisPositionMaxPossibleOffset.y), atThisPositionMaxPossibleOffset.y * -1)
        }

        setZoomCenter([clamp.x, clamp.y])
    }

    const reset = () => {
        setZoomCenter([0, 0])
        setZoomLevel(0)
    }

    return {
        zoom,
        zoomRef,
        reset,
        zoomLevel,
        zoomCenter
    }
}
