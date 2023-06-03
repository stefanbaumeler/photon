import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { EMediumSort } from 'web/src/types/app'
import { useSortBy } from 'react-instantsearch-hooks'

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

    const sortBy = useSortBy({
        items: [
            {
                label: '',
                value: 'media/sort/dateTakenSort:asc'
            },
            {
                label: '',
                value: 'media/sort/dateTakenSort:desc'
            }
        ]
    })

    useEffect(() => {
        sortBy.refine(`media/sort/dateTakenSort:${sort === EMediumSort.OLDEST ? 'asc' : 'desc'}`)
    }, [sort])

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
