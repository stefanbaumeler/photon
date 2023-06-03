import { createContext, ReactNode, useContext } from 'react'
import { TAlbum, TMedium } from '@photon/schema'

type Props = {
    children?: ReactNode
    element: TMedium | TAlbum
    width?: number
    height?: number
}

interface TeaserContext {
    element: TMedium | TAlbum
    width?: number
    height?: number
}

const TeaserContext = createContext<TeaserContext | null>(null)

const TeaserProvider = ({
    children, element, width, height
}: Props) => {
    return <TeaserContext.Provider value={{
        element,
        width,
        height
    }}
    >
        {children}
    </TeaserContext.Provider>
}

const useTeaserContext = () => {
    return useContext(TeaserContext)
}

export {
    TeaserProvider, useTeaserContext
}
