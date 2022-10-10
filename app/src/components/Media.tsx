import { TMedium } from '@/types/api'
import { MediaSection } from '@/components'
import { useContext, useEffect, useState } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import { formatDate, toDate } from '@/util/date'

type Props = {
    media: TMedium[]
}

const Media = ({ media }: Props) => {
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)
    const dialog = useContext(DialogContext)

    const [sections, setSections] = useState<JSX.Element[]>([])

    useEffect(() => {
        const takenDates = new Set<string>()

        const mediaSortedByDateTaken = media
            .sort((a, b) => toDate(b.dateTaken).getTime() - toDate(a.dateTaken).getTime())

        mediaSortedByDateTaken.forEach((medium) => {
            takenDates.add(formatDate(medium.dateTaken))
        })

        const unsortedSections = Array.from(takenDates).map((takenDate, key) => {
            const takenOnThisDate = mediaSortedByDateTaken.filter((medium) => formatDate(medium.dateTaken) === takenDate)
            const notRemoved = selection.mode === ESelectionMode.DELETE ? takenOnThisDate.filter((medium) => !selection.selected.has(medium)) : takenOnThisDate

            if (!notRemoved.length) {
                return {
                    date: toDate(takenOnThisDate[0]?.dateTaken).getTime(),
                    template: <></>
                }
            }

            console.log(mediaSortedByDateTaken)

            return {
                date: toDate(takenOnThisDate[0]?.dateTaken).getTime(),
                template: <MediaSection
                    key={key}
                    title={takenDate}
                    media={notRemoved}
                    collection={mediaSortedByDateTaken}
                />
            }
        })

        const s = unsortedSections
            .sort((a, b) => b.date - a.date)
            .map((section) => section.template)

        setSections(s)
    }, [media])

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (!details.active && !dialog.active) {
                    selection.clear()
                }
            }
        }

        window.addEventListener('keydown', keydown)

        return () => {
            window.removeEventListener('keydown', keydown)
        }
    }, [details.active, dialog.active])

    return <div className="media">
        <div className="media__header">
            sort
        </div>
        <div className="media__sections">
            {sections}
        </div>
    </div>
}

export default Media
