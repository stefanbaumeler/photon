import { useContext } from 'react'
import { ScrollbarContext } from './ScrollbarContext'

type Props = {
    mouseY: number
}
export const ScrollbarCursor = ({ mouseY }: Props) => {
    const scrollbar = useContext(ScrollbarContext)

    if (!scrollbar?.mouseOverMonth) {
        return <></>
    }

    return <span
        className="scrollbar__cursor"
        style={{
            translate: `0 calc(${mouseY}px - 200%)`
        }}
    >
        {scrollbar?.mouseOverMonth}
    </span>
}
