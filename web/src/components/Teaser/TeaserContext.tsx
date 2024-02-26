import { createContext, ReactNode, useContext } from 'react'
import { TMedium } from '@photon/schema'

type Props = {
    children?: ReactNode
    id: string
    href: string
    displayWidth?: number
    displayHeight?: number
    nativeWidth: number
    nativeHeight: number
    cover?: Pick<TMedium, 'id' | 'filenameDisk' | 'mimetype'>
    draggable: boolean
    selectable: boolean
    onOpen?: () => void
    topLeftControls?: ReactNode
    topRightControls?: ReactNode
    bottomLeftControls?: ReactNode
    bottomRightControls?: ReactNode
    content?: ReactNode
}

interface TeaserContext {
    id: string
    href: string
    displayWidth?: number
    displayHeight?: number
    nativeWidth: number
    nativeHeight: number
    cover?: Pick<TMedium, 'id' | 'filenameDisk' | 'mimetype'>
    draggable: boolean
    selectable: boolean
    onOpen?: () => void
    topLeftControls?: ReactNode
    topRightControls?: ReactNode
    bottomLeftControls?: ReactNode
    bottomRightControls?: ReactNode
    content?: ReactNode
}

const TeaserContext = createContext<TeaserContext | null>(null)

const TeaserProvider = ({
    children, ...teaser
}: Props) => {
    return <TeaserContext.Provider value={teaser}>
        {children}
    </TeaserContext.Provider>
}

const useTeaserContext = () => {
    return useContext(TeaserContext)
}

export {
    TeaserProvider, useTeaserContext
}
