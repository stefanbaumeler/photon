import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { EMediumStatus } from '@/types/app'
import { useSortContext } from '@/providers/SortProvider'
import { useRouter } from 'next/router'
import { sortMediaByDate } from '@/util/sort'
import { TQMedia, useQMedia } from '@photon/schema'
import { UseQueryExecute } from 'urql'

type Props = {
    children?: ReactNode
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

const SearchProvider = ({ children }: Props) => {
    const router = useRouter()

    const album = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum

    const [status, setStatus] = useState(EMediumStatus.ALL)
    const [favorites, setFavorites] = useState(false)
    const [query, setQuery] = useState('')
    const { sort } = useSortContext()

    const [{ data: media }, refresh] = useQMedia({
        variables: {
            status,
            sort,
            album,
            favorites,
            q: query
        }
    })

    const sortedMedia = sortMediaByDate<TQMedia['media']>(media?.media || [], sort)

    return <SearchContext.Provider value={{
        hits: sortedMedia,
        setStatus,
        status,
        favorites,
        setFavorites,
        query,
        setQuery,
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
    return useContext(SearchContext)
}
export {
    SearchProvider, useSearchContext
}
