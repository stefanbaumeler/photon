import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { Exact, TMedium, TQMedia, useQMedia } from '@photon/schema'
import { EMediumSort, EMediumStatus } from '@/types/app'
import { useSortContext } from '@/providers/SortProvider'
import { useRouter } from 'next/router'
import { ApolloQueryResult } from '@apollo/client/core/types'
import { sortMediaByDate } from '@/util/sort'

type Props = {
    children?: ReactNode
}

interface SearchContext {
    hits: TMedium[]
    setStatus: Dispatch<SetStateAction<EMediumStatus>>
    status: EMediumStatus
    refetch: (variables?: Partial<Exact<{status?: string, sort?: string, album?: string}>>) => Promise<ApolloQueryResult<TQMedia>>
}

const SearchContext = createContext<SearchContext | null>(null)

const SearchProvider = ({ children }: Props) => {
    const router = useRouter()

    const album = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum

    const [status, setStatus] = useState(EMediumStatus.ALL)

    const { sort } = useSortContext()

    const media = useQMedia({
        variables: {
            status,
            sort,
            album
        }
    })

    const sortedMedia = sortMediaByDate(media.data?.media || [], sort)

    return <SearchContext.Provider value={{
        hits: sortedMedia,
        setStatus,
        status,
        refetch: media.refetch
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
