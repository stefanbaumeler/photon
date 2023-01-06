import { useEffect, useState } from 'react'
import bem from '@/util/bem'
import ScrollbarYears from './ScrollbarYears'
import { ScrollbarPosition } from './ScrollbarPosition'
import { ScrollbarCursor } from './ScrollbarCursor'
import { useScrollbarContext } from './ScrollbarContext'

const Scrollbar = () => {
    const [mouseY, setMouseY] = useState<number>()
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

export default Scrollbar
