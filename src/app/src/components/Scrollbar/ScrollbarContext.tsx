import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { TYearCountEntry, useQMediaYearCount } from '@/api'

type Props = {
    children?: ReactNode
}

interface ScrollbarContext {
    mouseOverMonth: string
    setMouseOverMonth: Dispatch<SetStateAction<string>>
    years: TYearCountEntry[]
    total: number
}

const ScrollbarContext = createContext<ScrollbarContext | null>(null)

const ScrollbarProvider = ({ children }: Props) => {
    const [mouseOverMonth, setMouseOverMonth] = useState<string>('')
    const [years, setYears] = useState<TYearCountEntry[]>()
    const [total, setTotal] = useState<number>()

    const count = useQMediaYearCount()

    useEffect(() => {
        if (count.data) {
            setYears(count.data.mediaCountByYear.years)
            setTotal(count.data.mediaCountByYear.count)
        }
    }, [count.data])

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

export {
    ScrollbarProvider, ScrollbarContext
}
