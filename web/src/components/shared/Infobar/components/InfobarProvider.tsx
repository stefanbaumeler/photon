'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import bem from '@/util/bem'

type Props = {
    children?: ReactNode
}

interface InfobarContext {
    showInfobar: () => void
    hideInfobar: () => void
    infobarVisible: boolean
}

const InfobarContext = createContext<InfobarContext | null>(null)

const InfobarProvider = ({ children }: Props) => {
    const [infobarVisible, setInfobarVisible] = useState(true)

    const classes = bem('infobar-state', [
        ['active', infobarVisible]
    ])

    return <InfobarContext.Provider value={{
        showInfobar: () => {
            setInfobarVisible(true)
        },
        hideInfobar: () => {
            setInfobarVisible(false)
        },
        infobarVisible
    }}
    >
        <div
            className={classes}
            data-testid="infobar-state"
        >
            {children}
        </div>
    </InfobarContext.Provider>
}

const useInfobarContext = () => {
    const ctx = useContext(InfobarContext)

    if (!ctx) {
        throw new Error('Context not defined')
    }

    return ctx
}

export {
    InfobarProvider, useInfobarContext
}
