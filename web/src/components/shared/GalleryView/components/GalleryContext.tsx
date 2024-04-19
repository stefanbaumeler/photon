import { createContext, ReactNode, useContext } from 'react'

type Props = {
    children?: ReactNode
    containerWidth?: number
}

interface GalleryContext {
    containerWidth: number
}

const GalleryContext = createContext<GalleryContext | null>(null)

const GalleryProvider = ({
    containerWidth = typeof window !== 'undefined' ? window.innerWidth - 272 : 0, children
}: Props) => {
    return <GalleryContext.Provider value={{
        containerWidth
    }}
    >
        {children}
    </GalleryContext.Provider>
}

const useGalleryContext = () => {
    const ctx = useContext(GalleryContext)

    if (!ctx) {
        throw new Error('Context not defined')
    }

    return ctx
}

export {
    GalleryProvider, useGalleryContext
}
