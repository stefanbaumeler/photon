import { createContext, ReactNode, useContext } from 'react'
import { TCover } from '@/components'

type Props = {
    children?: ReactNode
    id: string
    href: string
    displayWidth?: number
    displayHeight?: number
    nativeWidth: number
    nativeHeight: number
    cover?: TCover | null
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
    cover?: TCover | null
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
