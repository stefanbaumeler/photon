import { useScrollbarContext } from '@/components/shared/Scrollbar/components/ScrollbarContext'

type Props = {
    mouseY: number
}
export const ScrollbarCursor = ({ mouseY }: Props) => {
    const scrollbar = useScrollbarContext()

    return scrollbar?.mouseOverMonth ? null : <span
        className="scrollbar__cursor"
        style={{
            translate: `0 calc(${mouseY}px - 200%)`
        }}
    >
        {scrollbar?.mouseOverMonth}
    </span>
}
