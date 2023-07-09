import { createContext, ReactNode, useContext } from 'react'
import { TMedium } from '@photon/schema'

type Props = {
    children?: ReactNode
    containerWidth: number
    targetRowHeight: number
}

interface GalleryContext {
    containerWidth: number
    targetRowHeight: number
}

const GalleryContext = createContext<GalleryContext | null>(null)

const GalleryProvider = ({
    containerWidth, targetRowHeight, children
}: Props) => {
    return <GalleryContext.Provider value={{
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
