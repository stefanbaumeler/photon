import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { ELayout } from '../types/app'
import { ETrans } from '../types/translations'
import * as Icons from '@mdi/js'
import { useTranslation } from 'react-i18next'

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
    getLayoutProps: (id: string) => LayoutProps
    nextLayout: ELayout
}

const LayoutContext = createContext<LayoutContext | null>(null)

const LayoutProvider = ({ children }: Props) => {
    const { t } = useTranslation()

    const [layout, setLayout] = useState(ELayout.GALLERY)

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
    const nextLayout = Object.values(ELayout)[Object.values(ELayout).indexOf(layout) + 1] || Object.values(ELayout)[0]

    return <LayoutContext.Provider value={{
        layout,
        setLayout,
        getLayoutProps,
        nextLayout
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
