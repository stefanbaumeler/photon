import { useContext, useEffect, useState } from 'react'
import bem from '@/util/bem'
import ScrollbarYears from '@/components/Scrollbar/ScrollbarYears'
import { ScrollbarPosition } from '@/components/Scrollbar/ScrollbarPosition'
import { ScrollbarCursor } from '@/components/Scrollbar/ScrollbarCursor'
import { ScrollbarContext } from '@/components/Scrollbar/ScrollbarContext'

const Scrollbar = () => {
    const [mouseY, setMouseY] = useState<number>()
    const [scrolling, setScrolling] = useState(false)
    let scrollingTimeout = 0

    const scrollbar = useContext(ScrollbarContext)

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
