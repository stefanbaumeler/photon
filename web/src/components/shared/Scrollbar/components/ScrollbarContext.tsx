import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { TMediumCountYear, useQMediaYearCount } from '@photon/schema'

type Props = {
    children?: ReactNode
}

interface ScrollbarContext {
    mouseOverMonth?: string
    setMouseOverMonth: Dispatch<SetStateAction<string | undefined>>
    years: TMediumCountYear[]
    total: number
}

const ScrollbarContext = createContext<ScrollbarContext | null>(null)

const ScrollbarProvider = ({ children }: Props) => {
    const [mouseOverMonth, setMouseOverMonth] = useState<string>()
    const [{ data: count }] = useQMediaYearCount()

    return <ScrollbarContext.Provider value={{
        mouseOverMonth,
        setMouseOverMonth,
        years: count?.countMediaByYear.years ?? [],
        total: count?.countMediaByYear.count ?? 0
    }}
    >
        {children}
    </ScrollbarContext.Provider>
}

const useScrollbarContext = () => {
    const ctx = useContext(ScrollbarContext)

    if (!ctx) {
        throw new Error('Context not defined')
    }

    return ctx
}

export {
    ScrollbarProvider, useScrollbarContext
}
