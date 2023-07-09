import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { EMediumSort } from '@/types/app'

type Props = {
    children?: ReactNode
}

interface SortContext {
    sort: EMediumSort
    setSort: Dispatch<SetStateAction<EMediumSort>>
}

const SortContext = createContext<SortContext | null>(null)

const SortProvider = ({ children }: Props) => {
    const [sort, setSort] = useState(EMediumSort.NEWEST)

    return <SortContext.Provider value={{
        sort,
        setSort
    }}
    >
        {children}
    </SortContext.Provider>
}

const useSortContext = () => {
    return useContext(SortContext)
}
export {
    SortProvider, useSortContext
}
