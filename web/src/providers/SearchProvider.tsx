'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { EMediumStatus } from '@/types/app'
import { useSortContext } from '@/providers/SortProvider'
import { useParams } from 'next/navigation'
import { sortMediaByDate } from '@/util/sort'
import { TQMedia, useQMedia } from '@photon/schema/dist/client'

type Props = {
    children?: ReactNode
    status?: EMediumStatus
    favorites?: boolean
}

interface SearchContext {
    hits: TQMedia['media']
    status: EMediumStatus
    setStatus: Dispatch<SetStateAction<EMediumStatus>>
    favorites: boolean
    setFavorites: Dispatch<SetStateAction<boolean>>
    query: string
    setQuery: Dispatch<SetStateAction<string>>
    refresh: () => void
}

const SearchContext = createContext<SearchContext | null>(null)

const SearchProvider = ({
    children, status: defaultStatus = EMediumStatus.ALL, favorites: defaultFavorites = false
}: Props) => {
    const params = useParams()
    const album = Array.isArray(params.idAlbum) ? params.idAlbum[0] : params.idAlbum

    const [status, setStatus] = useState(defaultStatus)
    const [favorites, setFavorites] = useState(defaultFavorites)
    const [searchQuery, setSearchQuery] = useState('')
    const { sort } = useSortContext()

    const [{ data: media }, refresh] = useQMedia({
        variables: {
            status,
            sort,
            album,
            favorites,
            q: searchQuery
        },
        pause: !status
    })

    const sortedMedia = sortMediaByDate<TQMedia['media']>(media?.media || [], sort)

    return <SearchContext.Provider value={{
        hits: sortedMedia,
        setStatus,
        status,
        favorites,
        setFavorites,
        query: searchQuery,
        setQuery: setSearchQuery,
        refresh: () => {
            refresh({
                requestPolicy: 'network-only'
            })
        }
    }}
    >
        {children}
    </SearchContext.Provider>
}

const useSearchContext = () => {
    const ctx = useContext(SearchContext)

    if (!ctx) {
        throw new Error('Context not defined')
    }

    return ctx
}

export {
    SearchProvider, useSearchContext
}
