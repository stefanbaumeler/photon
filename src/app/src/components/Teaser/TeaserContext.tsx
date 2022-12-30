import { createContext, ReactNode } from 'react'
import { TMedium } from '@/api'

type Props = {
    children?: ReactNode
    medium: TMedium
    width: number
    height: number
}

interface TeaserContext {
    medium: TMedium
    width: number
    height: number
}

const TeaserContext = createContext<TeaserContext | null>(null)

const TeaserProvider = ({
    children, medium, width, height
}: Props) => {
    return <TeaserContext.Provider value={{
        medium,
        width,
        height
    }}
    >
        {children}
    </TeaserContext.Provider>
}

export {
    TeaserProvider, TeaserContext
}
