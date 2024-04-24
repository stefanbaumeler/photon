import { useScrollbarContext } from '@/components/shared/Scrollbar/components/ScrollbarContext'
import { ScrollbarMonths } from '@/components/shared/Scrollbar/components/ScrollbarMonths'

export const ScrollbarYears = () => {
    const scrollbar = useScrollbarContext()

    return scrollbar.years ? <div className="scrollbar__years">
        {scrollbar.years.map((year, k) => {
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
        })}
    </div> : null
}
