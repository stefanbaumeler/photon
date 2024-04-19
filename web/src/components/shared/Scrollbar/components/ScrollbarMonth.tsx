import { formatDate } from '@/util/date'
import { EDateFormat } from '@/types/app'
import { MouseEventHandler } from 'react'
import { useScrollbarContext } from '..'

type Props = {
    percentage?: number
    year: number
    month: number
}

export const ScrollbarMonth = ({
    percentage, year, month
}: Props) => {
    const scrollbar = useScrollbarContext()

    const click: MouseEventHandler<HTMLDivElement> = (event) => {
        const percentage = (event.clientY - 88) / (window.innerHeight - 88)

        if (document.scrollingElement) {
            document.scrollingElement.scrollTop = (document.scrollingElement.scrollHeight - window.innerHeight) * percentage
        }
    }

    return <div
        className="scrollbar__month"
        onMouseOver={() => scrollbar.setMouseOverMonth(formatDate(`${year}-${month}-1`, EDateFormat.SHORT_NO_DATE))}
        onClick={click}
        style={{
            height: percentage ? `${percentage}%` : ''
        }}
    />
}
