import { useScrollbarContext } from './ScrollbarContext'
import ScrollbarMonths from './ScrollbarMonths'

const ScrollbarYears = () => {
    const scrollbar = useScrollbarContext()

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
