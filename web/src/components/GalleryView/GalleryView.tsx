import { useEffect, useState } from 'react'
import { EMediumSort, ESelectionMode } from '@/types/app'
import { formatDate } from '@/util/date'
import { GallerySection } from './GallerySection'
import { useSelectionContext, useSortContext } from '@/providers'
import { useGalleryContext } from './GalleryContext'
import { Scrollbar } from '@/components'

export const GalleryView = () => {
    const selection = useSelectionContext()
    const gallery = useGalleryContext()

    const [sections, setSections] = useState([])
    const sort = useSortContext()

    useEffect(() => {
        const groups = gallery.media
            .filter((medium) => selection.mode === ESelectionMode.DELETE ? !selection.selected.has(medium) : true)
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
            const mediaMatchingThisGroup = gallery.media.filter((medium) => {
                return sort.sort === EMediumSort.RECENT
                    ? formatDate(medium.dateCreated) === groupDate
                    : formatDate(medium.dateTaken) === groupDate || !medium.dateTaken && formatDate(medium.dateCreated) === groupDate
            })

            if (!mediaMatchingThisGroup.length) {
                return
            }

            return <GallerySection
                key={key}
                title={groupDate}
                media={mediaMatchingThisGroup}
            />
        })

        setSections(newSections)
    }, [selection.mode, selection.selected, gallery.media, sort.sort])

    return <div className="gallery">
        <div className="gallery__sections">
            {sections}
        </div>
        <Scrollbar />
    </div>
}
