import { createContext, ReactNode, useContext } from 'react'
import { TCover } from '@/types/app'

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

type Props = {
    children?: ReactNode
} & TeaserContext

const TeaserContext = createContext<TeaserContext | null>(null)

const TeaserProvider = ({
    children, ...teaser
}: Props) => {
    return <TeaserContext.Provider value={teaser}>
        {children}
    </TeaserContext.Provider>
}

const useTeaserContext = () => {
    const ctx = useContext(TeaserContext)

    if (!ctx) {
        throw new Error('Context not defined')
    }

    return ctx
}

export {
    TeaserProvider, useTeaserContext
}
