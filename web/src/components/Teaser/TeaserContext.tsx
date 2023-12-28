import { createContext, ReactNode, useContext } from 'react'
import { TAlbum, TMedium, TQAlbums, TQMedia } from '@photon/schema'

type Props = {
    children?: ReactNode
    element: TQMedia['media'][number] | TQAlbums['albums'][number]
    width?: number
    height?: number
}

interface TeaserContext {
    element: TQMedia['media'][number] | TQAlbums['albums'][number]
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
