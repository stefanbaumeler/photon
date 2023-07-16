import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { TMedium, useQMedia } from '@photon/schema'
import { EMediumStatus } from '@/types/app'
import { useSortContext } from '@/providers/SortProvider'
import { useRouter } from 'next/router'
import { sortMediaByDate } from '@/util/sort'
import { useArchiveContext } from '@/providers/ArchiveProvider'

type Props = {
    children?: ReactNode
}

interface SearchContext {
    hits: TMedium[]
    status: EMediumStatus
    setStatus: Dispatch<SetStateAction<EMediumStatus>>
    favorites: boolean
    setFavorites: Dispatch<SetStateAction<boolean>>
    query: string
    setQuery: Dispatch<SetStateAction<string>>
    refetch: () => void
}

const SearchContext = createContext<SearchContext | null>(null)

const SearchProvider = ({ children }: Props) => {
    const router = useRouter()

    const album = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum

    const [status, setStatus] = useState(EMediumStatus.ALL)
    const [favorites, setFavorites] = useState(false)
    const [query, setQuery] = useState('')
    const { sort } = useSortContext()

    const media = useQMedia({
        variables: {
            status,
            sort,
            album,
            favorites,
            q: query
        }
    })

    console.log(status)
    const sortedMedia = sortMediaByDate(media.data?.media || [], sort)

    return <SearchContext.Provider value={{
        hits: sortedMedia,
        setStatus,
        status,
        favorites,
        setFavorites,
        query,
        setQuery,
        refetch: async () => {
            console.log('refetch', status)
            await media.refetch({
                status,
                sort,
                album,
                favorites,
                q: query
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
