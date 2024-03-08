import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { TMediumCountYear, useQMediaYearCount } from '@photon/schema'

type Props = {
    children?: ReactNode
}

interface ScrollbarContext {
    mouseOverMonth: string
    setMouseOverMonth: Dispatch<SetStateAction<string>>
    years: TMediumCountYear[]
    total: number
}

const ScrollbarContext = createContext<ScrollbarContext | null>(null)

const ScrollbarProvider = ({ children }: Props) => {
    const [mouseOverMonth, setMouseOverMonth] = useState<string>('')
    const [years, setYears] = useState<TMediumCountYear[]>()
    const [total, setTotal] = useState<number>()

    const [{ data: count }] = useQMediaYearCount()

    useEffect(() => {
        if (count) {
            setYears(count.countMediaByYear.years)
            setTotal(count.countMediaByYear.count)
        }
    }, [count])

    return <ScrollbarContext.Provider value={{
        mouseOverMonth,
        setMouseOverMonth,
        years,
        total
    }}
    >
        {children}
    </ScrollbarContext.Provider>
}

const useScrollbarContext = () => {
    return useContext(ScrollbarContext)
}

export {
    ScrollbarProvider, useScrollbarContext
}
