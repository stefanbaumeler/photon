import { useHits } from 'react-instantsearch-hooks-web'
import { TMedium } from '@photon/schema'
import { useEffect, useState } from 'react'
import { EMediumSort, ESelectionMode } from '@/types/app'
import { formatDate } from '@/util/date'
import { GallerySection } from '@/components/GallerySection'
import { useSearchContext, useSelectionContext, useSortContext } from '@/providers'

export const GalleryView = () => {
    const { hits: media } = useSearchContext()
    const selection = useSelectionContext()

    const [sections, setSections] = useState([])
    const sort = useSortContext()

    useEffect(() => {
        const hitsWithMeta = media.map((medium) => {
            if (typeof medium.meta === 'string') {
                medium.meta = JSON.parse(medium.meta)
            }

            return medium
        }) as TMedium[]

        const groups = hitsWithMeta
            .filter((medium) => {
                return selection.mode === ESelectionMode.DELETE ? !selection.selected.has(medium) : true
            })
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

        const newSections = Array.from(new Set(groups)).map((groupDate, key) => {
            const mediaMatchingThisGroup = hitsWithMeta.filter((medium) => {
                return sort.sort === EMediumSort.RECENT
                    ? formatDate(medium.dateCreated) === groupDate
                    : formatDate(medium.dateTaken) === groupDate || !medium.dateTaken && formatDate(medium.dateCreated) === groupDate
            })

            if (!mediaMatchingThisGroup.length) {
                return <></>
            }

            return <GallerySection
                key={key}
                title={groupDate}
                media={mediaMatchingThisGroup}
            />
        })

        setSections(newSections)
    }, [media, sort.sort])

    return <div className="gallery">
        <div className="gallery__sections">
            {sections}
        </div>
    </div>
}
