import { createContext, ReactNode, useContext, useState } from 'react'

type Props = {
    children?: ReactNode
}

interface ListContext {
    headers: string[]
}

const ListContext = createContext<ListContext | null>(null)

const ListProvider = ({ children }: Props) => {
    const [headers, setHeaders] = useState<string[]>(['selectable', 'favorite', 'camera', 'preview', 'title', 'dateTaken', 'mimetype', 'owner', 'controls'])

    return <ListContext.Provider value={{
        headers
    }}
    >
        {children}
    </ListContext.Provider>
}

const useListContext = () => {
    return useContext(ListContext)
}

export {
    ListProvider, useListContext
}
