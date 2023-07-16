import { useEffect, useState } from 'react'
import { EMediumSort, ESelectionMode } from '@/types/app'
import { formatDate } from '@/util/date'
import { GallerySection } from './GallerySection'
import { useSearchContext, useSelectionContext, useSortContext } from '@/providers'
import { Scrollbar } from '@/components'
import { sortMediaByDate } from '@/util/sort'

export const GalleryView = () => {
    const selection = useSelectionContext()
    const { hits: media } = useSearchContext()
    const sort = useSortContext()

    const [sections, setSections] = useState([])

    useEffect(() => {
        const groups = media.filter((medium) => selection.mode === ESelectionMode.DELETE ? !selection.selected.has(medium) : true)
            .map((medium) => {
                const groupByDate = sort.sort === EMediumSort.RECENT ? medium.dateCreated : medium.dateTaken

                if (groupByDate) {
                    return new Date(groupByDate)
                }

                if (medium.dateCreated) {
                    return new Date(medium.dateCreated)
                }
            }).sort((a, b) => {
                const aTime = a.getTime()
                const bTime = b.getTime()
                return sort.sort === EMediumSort.OLDEST ? aTime - bTime : bTime - aTime
            }).map((groupDate) => formatDate(groupDate))

        const newSections = [...new Set(groups)].map((groupDate, key) => {
            const mediaMatchingThisGroup = media.filter((medium) => {
                return sort.sort === EMediumSort.RECENT
                    ? formatDate(medium.dateCreated) === groupDate
                    : formatDate(medium.dateTaken) === groupDate || !medium.dateTaken && formatDate(medium.dateCreated) === groupDate
            })

            const sortedMedia = sortMediaByDate(mediaMatchingThisGroup, sort.sort)

            if (!sortedMedia.length) {
                return
            }

            return <GallerySection
                key={key}
                title={groupDate}
                media={sortedMedia}
            />
        })

        setSections(newSections)
    }, [selection.mode, selection.selected, media, sort.sort])

    return <div className="gallery">
        <div className="gallery__sections">
            {sections}
        </div>
        <Scrollbar />
    </div>
}
