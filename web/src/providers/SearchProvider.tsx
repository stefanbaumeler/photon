import { createContext, ReactNode, useContext } from 'react'
import { useHits, useInstantSearch } from 'react-instantsearch-hooks-web'
import { TMedium } from '@photon/schema'

type Props = {
    children?: ReactNode
}

interface SearchContext {
    instantSearch: ReturnType<typeof useInstantSearch>
    hits: TMedium[]
}

const SearchContext = createContext<SearchContext | null>(null)

const SearchProvider = ({ children }: Props) => {
    const instantSearch = useInstantSearch()

    const { hits } = useHits<TMedium>()

    return <SearchContext.Provider value={{
        instantSearch,
        hits
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
