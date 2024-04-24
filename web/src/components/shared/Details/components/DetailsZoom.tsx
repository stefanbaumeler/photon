'use client'

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useZoom } from '@/components/shared/Details/hooks/zoom'
import { TCover } from '@/types/app'
import bem from '@/util/bem'
import { useInfobarContext } from '@/components/shared/Infobar/components/InfobarContext'

type Props = {
    children: ReactNode
    medium: TCover
}
export const DetailsZoom = ({
    children, medium
}: Props) => {
    const {
        zoom, zoomRef, zoomLevel, zoomCenter
    } = useZoom()

    const infobar = useInfobarContext()

    const [borderPosition, setBorderPosition] = useState<'horizontal' | 'vertical'>()
    const zoomContainerRef = useRef<HTMLDivElement>(null)

    const resize = useCallback(() => {
        if (!medium || !zoomContainerRef) {
            return
        }

        const imageAspectRatio = medium.meta.width / medium.meta.height
        const containerAspectRatio = (zoomContainerRef.current?.clientWidth ?? 0) / (zoomContainerRef.current?.clientHeight ?? 1)

        if (imageAspectRatio > containerAspectRatio) {
            setBorderPosition('horizontal')
        }
        else {
            setBorderPosition('vertical')
        }
    }, [medium])

    useEffect(() => {
        window.addEventListener('resize', resize)

        return () => window.removeEventListener('resize', resize)
    })

    useEffect(() => {
        const interval = window.setInterval(resize, 10)
        const timeout = window.setTimeout(() => {
            clearInterval(interval)
        }, 300)
        return () => {
            clearTimeout(timeout)
            clearInterval(interval)
        }
    }, [infobar.infobarVisible])

    useEffect(() => {
        resize()
    }, [resize])

    const zoomContainerClasses = bem('details__zoom-container', [
        ['video', medium.mimetype?.startsWith('video')]
    ])

    const zoomClasses = bem('details__zoom', [
        ['active', zoomLevel !== 0]
    ])

    return <div
        className={zoomContainerClasses}
        ref={zoomContainerRef}
    >
        <div
            className="details__container"
            onWheel={zoom}
            style={{
                opacity: borderPosition ? 1 : 0
            }}
        >
            <div
                className={zoomClasses}
                ref={zoomRef}
                style={{
                    scale: `${zoomLevel + 1}`,
                    translate: `${zoomCenter[0]}px ${zoomCenter[1]}px`,
                    aspectRatio: `${medium.meta.width} / ${medium.meta.height}`
                }}
            >
                {children}
            </div>
        </div>
    </div>
}
