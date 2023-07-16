import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { Exact, TMedium, TQMedia, useQMedia } from '@photon/schema'
import { EMediumStatus } from '@/types/app'
import { useSortContext } from '@/providers/SortProvider'
import { ApolloQueryResult } from '@apollo/client/core/types'
import { sortMediaByDate } from '@/util/sort'

type Props = {
    children?: ReactNode
}

interface SearchContext {
    hits: TMedium[]
    status: EMediumStatus
    setStatus: Dispatch<SetStateAction<EMediumStatus>>
    refetch: (variables?: Partial<Exact<{status?: string, sort?: string, album?: string}>>) => Promise<ApolloQueryResult<TQMedia>>
}

const SearchContext = createContext<SearchContext | null>(null)

const ArchiveProvider = ({ children }: Props) => {
    const [status, setStatus] = useState(EMediumStatus.ALL)
    const { sort } = useSortContext()

    const archive = useQMedia({
        variables: {
            status: EMediumStatus.ARCHIVED,
            sort
        }
    })

    const sortedMedia = sortMediaByDate(archive.data?.media || [], sort)

    return <SearchContext.Provider value={{
        hits: sortedMedia,
        setStatus,
        status,
        refetch: archive.refetch
    }}
    >
        {children}
    </SearchContext.Provider>
}

const useArchiveContext = () => {
    return useContext(SearchContext)
}
export {
    ArchiveProvider, useArchiveContext
}
