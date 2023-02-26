import { useDetailsContext, useDialogContext, useLayoutContext, useSearchContext, useSelectionContext } from '@/providers'
import useKeyboard from '../hooks/keyboard'
import { ELayout } from '@/types/app'
import { GalleryView, ListView, MapView } from './'
import { useEffect } from 'react'

export const Media = () => {
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const dialog = useDialogContext()
    const layout = useLayoutContext()
    const { hits: media } = useSearchContext()

    useEffect(() => {
        if (details.medium && Object.keys(details.medium).length && media) {
            details.setMedium(media.find((m) => m.id === details.medium.id))
        }
    }, [media])

    useKeyboard('keydown', 'Escape', () => {
        if (!details.active && !dialog.active) {
            selection.clear()
        }
    }, [details.active, dialog.active])

    if (layout.layout === ELayout.GALLERY) {
        return <GalleryView />
    }

    if (layout.layout === ELayout.LIST) {
        return <ListView />
    }

    if (layout.layout === ELayout.MAP) {
        return <MapView />
    }

    return <></>
}
