'use client'

import { TMedium } from '@photon/schema/dist/client'
import { GalleryProvider } from '@/components/shared/GalleryView/components/GalleryContext'
import { VisualGalleryView } from '@/components/shared/GalleryView/components/VisualGalleryView'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useSortContext } from '@/providers/SortProvider'
import { EMediumSort, ESelectionMode } from '@/types/app'
import { formatDate } from '@/util/date'
import { sortMediaByDate } from '@/util/sort'
import { GallerySection } from '@/components/shared/GalleryView/components/GallerySection'
import { useEffect, useState } from 'react'

type Props = {
    containerWidth?: number
    elements: TMedium[]
}

export const GalleryView = ({
    containerWidth, elements
}: Props) => {
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
            const aTime = a?.getTime() ?? 0
            const bTime = b?.getTime() ?? 0
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
            return {
                media: [],
                date: groupDate
            }
        }

        return {
            media: sortedMedia,
            date: groupDate
        }
    })

    const [isSSR, setIsSSR] = useState(true)

    useEffect(() => {
        setIsSSR(false)
    }, [])

    return <GalleryProvider
        containerWidth={containerWidth}
    >
        <VisualGalleryView>
            {isSSR ? null : sections.map((group, key) => {
                return <GallerySection
                    key={key}
                    title={group.date}
                    media={group.media}
                />
            })}
        </VisualGalleryView>
    </GalleryProvider>
}
