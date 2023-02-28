import { createContext, ReactNode, useContext } from 'react'
import { TMedium } from '@photon/schema'

type Props = {
    children?: ReactNode
    media: TMedium[]
    containerWidth: number
    targetRowHeight: number
}

interface GalleryContext {
    media: TMedium[]
    containerWidth: number
    targetRowHeight: number
}

const GalleryContext = createContext<GalleryContext | null>(null)

const GalleryProvider = ({
    containerWidth, targetRowHeight, media, children
}: Props) => {
    return <GalleryContext.Provider value={{
        media,
        containerWidth,
        targetRowHeight
    }}
    >
        {children}
    </GalleryContext.Provider>
}

const useGalleryContext = () => {
    return useContext(GalleryContext)
}

export {
    GalleryProvider, useGalleryContext
}
