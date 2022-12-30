import { useContext } from 'react'
import { ScrollbarContext } from '@/components/Scrollbar/ScrollbarContext'
import ScrollbarMonths from '@/components/Scrollbar/ScrollbarMonths'

const ScrollbarYears = () => {
    const scrollbar = useContext(ScrollbarContext)

    if (!scrollbar.years) {
        return <></>
    }
    const yearElements = scrollbar.years.map((year, k) => {
        const percentage = year.count / scrollbar.total * 100

        return <div
            className="scrollbar__year"
            key={k}
            style={{
                height: `${percentage}%`
            }}
        >
            <span className="scrollbar__label">
                {year.year}
            </span>
            <ScrollbarMonths
                year={year}
            />
        </div>
    })

    return <div className="scrollbar__years">
        {yearElements}
    </div>
}

export default ScrollbarYears
