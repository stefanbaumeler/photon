import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { EMediumSort, EMediumStatus, ESelectionMode } from '@/types/app'
import { TMedium, useQAlbumMedia, useQFavorites, useQMedia } from '@photon/schema'
import { useRouter } from 'next/router'
import { formatDate, toDate } from '@/util/date'
import { GallerySection } from '@/components'
import { useSelectionContext } from './SelectionProvider'

type Props = {
    children?: ReactNode
}

interface MediaContext {
    sort: EMediumSort
    setSort: Dispatch<SetStateAction<EMediumSort>>
    status: EMediumStatus
    media: TMedium[]
    sections: JSX.Element[]
}

const MediaContext = createContext<MediaContext | null>(null)

const MediaProvider = ({ children }: Props) => {
    const router = useRouter()
    const topLevelRoute = router.pathname.split('/')[1]

    let defaultStatus = EMediumStatus.ALL

    if (topLevelRoute === 'archive') {
        defaultStatus = EMediumStatus.ARCHIVED
    } else if (topLevelRoute === 'trash') {
        defaultStatus = EMediumStatus.TRASH
    }

    const idAlbum  = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum

    const [sort, setSort] = useState(EMediumSort.NEWEST)
    const [status, setStatus] = useState(defaultStatus)
    const [sections, setSections] = useState<JSX.Element[]>([])

    const selection = useSelectionContext()

    const favoritesQuery = useQFavorites()

    const albumMediaQuery = useQAlbumMedia({
        variables: {
            id: idAlbum
        },
        skip: !router.isReady || !idAlbum
    })

    const mediaQuery = useQMedia({
        variables: {
            sort,
            status: EMediumStatus.ALL
        }
    })

    const trashQuery = useQMedia({
        variables: {
            sort,
            status: EMediumStatus.TRASH
        }
    })

    const archiveQuery = useQMedia({
        variables: {
            sort,
            status: EMediumStatus.ARCHIVED
        }
    })

    const mediaQueryByStatus = {
        all: mediaQuery,
        trash: trashQuery,
        archived: archiveQuery
    }

    useEffect(() => {
        if (idAlbum) {
            albumMediaQuery.refetch({
                id: idAlbum
            })
        }
    }, [idAlbum])

    useEffect(() => {
        let newStatus: EMediumStatus

        if (topLevelRoute === 'archive') {
            newStatus = EMediumStatus.ARCHIVED
        } else if (topLevelRoute === 'trash') {
            newStatus = EMediumStatus.TRASH
        } else {
            newStatus = EMediumStatus.ALL
        }

        if (newStatus !== status) {
            setStatus(newStatus)
        }
    }, [router.pathname])

    let media = mediaQueryByStatus[status].data?.media || []

    if (idAlbum) {
        media = albumMediaQuery.data?.albumMedia || []
    }

    if (topLevelRoute === 'favorites') {
        media = favoritesQuery.data?.favorites as TMedium[] || []
    }

    useEffect(() => {
        const groups = new Set<string>()

        media.forEach((medium) => {
            const groupByDate = formatDate(sort === EMediumSort.RECENT ? medium.dateCreated : medium.dateTaken)

            if (groupByDate) {
                groups.add(groupByDate)
            } else {
                const dateCreated = formatDate(medium.dateCreated)

                if (dateCreated) {
                    groups.add(dateCreated)
                }
            }
        })

        const newSections = Array.from(groups).filter((groupDate) => {
            const mediaMatchingThisGroup = media.filter((medium) => {
                return sort === EMediumSort.RECENT
                    ? formatDate(medium.dateCreated) === groupDate
                    : formatDate(medium.dateTaken) === groupDate || !medium.dateTaken && formatDate(medium.dateCreated) === groupDate
            })

            return !!mediaMatchingThisGroup.length
        }).map((groupDate, key) => {
            let mediaMatchingThisGroup
            let date

            if (sort === EMediumSort.RECENT) {
                mediaMatchingThisGroup = media.filter((medium) => {
                    return formatDate(medium.dateCreated) === groupDate
                })

                date = toDate(mediaMatchingThisGroup[0]?.dateCreated)?.getTime()
            } else {
                mediaMatchingThisGroup = media.filter((medium) => {
                    return formatDate(medium.dateTaken) === groupDate || !medium.dateTaken && formatDate(medium.dateCreated) === groupDate
                })

                date = toDate(mediaMatchingThisGroup[0]?.dateTaken || mediaMatchingThisGroup[0]?.dateCreated).getTime()
            }

            const notRemoved = selection.mode === ESelectionMode.DELETE ? mediaMatchingThisGroup.filter((medium) => !selection.selected.has(medium)) : mediaMatchingThisGroup

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
                    title={groupDate}
                    media={notRemoved}
                />
            }
        }).sort((a, b) => {
            return sort === EMediumSort.OLDEST ? a.date - b.date : b.date - a.date
        }).map((section) => section.template)

        setSections(newSections)
    }, [mediaQueryByStatus[status], albumMediaQuery, topLevelRoute])

    return <MediaContext.Provider value={{
        sort,
        setSort,
        status,
        media,
        sections
    }}
    >
        {children}
    </MediaContext.Provider>
}

const useMediaContext = () => {
    return useContext(MediaContext)
}
export {
    MediaProvider, useMediaContext
}
