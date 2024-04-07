import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { ELayout } from '@/types/app'
import { ETrans } from '@/types/translations'
import * as Icons from '@mdi/js'
import { useTranslation } from 'react-i18next'
import { useHotkeysContext } from 'react-hotkeys-hook'

type Props = {
    children?: ReactNode
}

type LayoutProps = {
    name: string
    icon: string
}

interface LayoutContext {
    layout: ELayout
    setLayout: Dispatch<SetStateAction<ELayout>>
    albumsLayout: ELayout
    setAlbumsLayout: Dispatch<SetStateAction<ELayout>>
    getLayoutProps: (id: string) => LayoutProps
}

const LayoutContext = createContext<LayoutContext | null>(null)

const LayoutProvider = ({ children }: Props) => {
    const { t } = useTranslation()

    const [layout, setLayout] = useState(ELayout.GALLERY)
    const [albumsLayout, setAlbumsLayout] = useState(ELayout.GRID)
    const {
        enableScope, disableScope
    } = useHotkeysContext()

    useEffect(() => {
        // enableScope(layout)
        Object.keys(ELayout).forEach((possibleLayout) => {
            if (possibleLayout !== layout) {
                disableScope(possibleLayout)
            }
        })
    }, [layout, enableScope, disableScope])

    const getLayoutProps = (id: string) => {
        switch (id) {
        case ELayout.GALLERY:
            return {
                name: t(ETrans.GALLERY_VIEW),
                icon: Icons.mdiViewCompact
            }
        case ELayout.LIST:
            return {
                name: t(ETrans.LIST_VIEW),
                icon: Icons.mdiFormatListBulletedSquare
            }
        case ELayout.MAP:
            return {
                name: t(ETrans.MAP_VIEW),
                icon: Icons.mdiMapMarker
            }
        }
    }

    return <LayoutContext.Provider value={{
        layout,
        setLayout,
        getLayoutProps,
        albumsLayout,
        setAlbumsLayout
    }}
    >
        {children}
    </LayoutContext.Provider>
}

const useLayoutContext = () => {
    return useContext(LayoutContext)
}

export {
    LayoutProvider, useLayoutContext
}
