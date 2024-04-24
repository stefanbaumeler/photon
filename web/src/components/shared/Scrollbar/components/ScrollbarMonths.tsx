import { TQMediaYearCount } from '@photon/schema/dist/client'
import { ScrollbarMonth } from '@/components/shared/Scrollbar/components/ScrollbarMonth'

type Props = {
    year: TQMediaYearCount['countMediaByYear']['years'][0]
}

export const ScrollbarMonths = ({ year }: Props) => {
    const monthElements: JSX.Element[] = []
    if (year.months.length < 2) {
        return <div className="scrollbar__months">
            <ScrollbarMonth
                year={year.year}
                month={year.months[0].month}
            />
        </div>
    }

    year.months.forEach((month, k) => {
        const percentage = month.count / year.count * 100

        monthElements.push(<ScrollbarMonth
            key={k}
            year={year.year}
            month={month.month}
            percentage={percentage}
        />)
    })

    return <div className="scrollbar__months">
        {monthElements}
    </div>
}
