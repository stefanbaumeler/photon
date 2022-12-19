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

    let foo

    try {
        foo = window.location.href
    } catch (e) {
        console.log(e)
    }

    media.forEach((medium) => {
        const dateTaken = formatDate(medium.dateTaken)

        if (dateTaken) {
            takenDates.add(dateTaken)
        }
    })

    console.log(media)

    useEffect(() => {
        details.setCollection(media)
    }, [media.length])

    useEffect(() => {
        const unsortedSections = Array.from(takenDates).map((takenDate, key) => {
            const takenOnThisDate = media.filter((medium) => formatDate(medium.dateTaken) === takenDate)
            const notRemoved = selection.mode === ESelectionMode.DELETE ? takenOnThisDate.filter((medium) => !selection.selected.has(medium)) : takenOnThisDate

            if (!notRemoved.length) {
                return {
                    date: toDate(takenOnThisDate[0]?.dateTaken).getTime(),
                    template: <></>
                }
            }

            return {
                date: toDate(takenOnThisDate[0]?.dateTaken).getTime(),
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
            {foo}
            sort
        </div>
        <div className="gallery__sections">
            {sections}
        </div>
    </div>
}

export default GalleryView
