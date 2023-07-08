import { createContext, ReactNode, useContext } from 'react'
import { useHits } from 'react-instantsearch-hooks-web'
import { TMedium, useQMedia } from '@photon/schema'

type Props = {
    children?: ReactNode
}

interface SearchContext {
    hits: TMedium[]
}

const SearchContext = createContext<SearchContext | null>(null)

const SearchProvider = ({ children }: Props) => {
    const { hits } = useHits<TMedium>()
    const media = useQMedia()

    const hitIds = hits.map((hit) => hit.id)

    const m = media.data?.media.filter((medium) => {
        return hitIds.includes(medium.id)
    }).sort((a, b) => {
        return hitIds.indexOf(a.id) - hitIds.indexOf(b.id)
    })

    return <SearchContext.Provider value={{
        hits: m || []
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
