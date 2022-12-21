import { TMedium } from '@/api'
import { GallerySection } from '@/components/index'
import { useContext, useEffect, useState } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import { formatDate, toDate } from '@/util/date'

type Props = {
    media: TMedium[]
}

const GalleryView = ({ media }: Props) => {
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)

    const [sections, setSections] = useState<JSX.Element[]>([])

    const takenDates = new Set<string>()

    media.forEach((medium) => {
        const dateTaken = formatDate(medium.dateTaken)

        if (dateTaken) {
            takenDates.add(dateTaken)
        } else {
            const dateCreated = formatDate(medium.dateCreated)

            if (dateCreated) {
                takenDates.add(dateCreated)
            }
        }
    })

    useEffect(() => {
        details.setCollection(media)
    }, [media.length])

    useEffect(() => {
        const unsortedSections = Array.from(takenDates).map((takenDate, key) => {
            const takenOnThisDate = media.filter((medium) => {
                return formatDate(medium.dateTaken) === takenDate || !medium.dateTaken && formatDate(medium.dateCreated) === takenDate
            })
            const notRemoved = selection.mode === ESelectionMode.DELETE ? takenOnThisDate.filter((medium) => !selection.selected.has(medium)) : takenOnThisDate
            const date = toDate(takenOnThisDate[0]?.dateTaken || takenOnThisDate[0]?.dateCreated).getTime()

            if (!notRemoved.length) {
                return {
                    date,
                    template: <></>
                }
            }

            return {
                date,
                template: <GallerySection
                    key={key}
                    title={takenDate}
                    media={notRemoved}
                />
            }
        })

        const s = unsortedSections
            .sort((a, b) => b.date - a.date)
            .map((section) => section.template)

        setSections(s)
    }, [media])

    return <div className="gallery">
        <div className="gallery__header">
            sort
        </div>
        <div className="gallery__sections">
            {sections}
        </div>
    </div>
}

export default GalleryView
