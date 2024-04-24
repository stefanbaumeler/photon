import { useEffect, useState } from 'react'
import bem from '@/util/bem'
import { useScrollbarContext } from '@/components/shared/Scrollbar/components/ScrollbarContext'
import { ScrollbarYears } from '@/components/shared/Scrollbar/components/ScrollbarYears'
import { ScrollbarPosition } from '@/components/shared/Scrollbar/components/ScrollbarPosition'
import { ScrollbarCursor } from '@/components/shared/Scrollbar/components/ScrollbarCursor'

export const VisualScrollbar = () => {
    const [mouseY, setMouseY] = useState<number>(0)
    const [scrolling, setScrolling] = useState(false)
    let scrollingTimeout = 0

    const scrollbar = useScrollbarContext()

    const scroll = () => {
        setScrolling(true)

        window.clearTimeout(scrollingTimeout)

        scrollingTimeout = window.setTimeout(() => {
            setScrolling(false)
        }, 1000)
    }

    useEffect(() => {
        window.addEventListener('scroll', scroll)

        return () => window.removeEventListener('scroll', scroll)
    })

    const classes = bem('scrollbar', [
        ['scrolling', scrolling]
    ])

    return  <div
        className={classes}
        onMouseMove={(event) => setMouseY(event.clientY)}
        onMouseOut={() => scrollbar.setMouseOverMonth(undefined)}
    >
        <ScrollbarYears />
        <ScrollbarPosition />
        <ScrollbarCursor mouseY={mouseY} />
    </div>
}
