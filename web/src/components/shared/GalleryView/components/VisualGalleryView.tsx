import { EMediumSort, ESelectionMode } from '@/types/app'
import { formatDate } from '@/util/date'
import { useSelectionContext, useSortContext } from '@/providers'
import { Scrollbar } from '@/components'
import { sortMediaByDate } from '@/util/sort'
import { TMedium } from '@photon/schema'
import { GallerySection } from '..'

type Props = {
    elements: TMedium[]
}

export const VisualGalleryView = ({ elements }: Props) => {
    const selection = useSelectionContext()
    const sort = useSortContext()

    const media = elements || []

    const groups = media.filter((medium) => selection.mode === ESelectionMode.DELETE ? !selection.selected.has(medium.id) : true)
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

    const sections = [...new Set(groups)].map((groupDate, key) => {
        const mediaMatchingThisGroup = media.filter((medium) => {
            return sort.sort === EMediumSort.RECENT
                ? formatDate(medium.dateCreated) === groupDate
                : formatDate(medium.dateTaken) === groupDate || !medium.dateTaken && formatDate(medium.dateCreated) === groupDate
        })

        const sortedMedia = sortMediaByDate(mediaMatchingThisGroup as TMedium[], sort.sort)

        if (!sortedMedia.length) {
            return
        }

        return <GallerySection
            key={key}
            title={groupDate}
            media={sortedMedia}
        />
    })

    return <div className="gallery">
        <div className="gallery__sections">
            {sections}
        </div>
        <Scrollbar />
    </div>
}
