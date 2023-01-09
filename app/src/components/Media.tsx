import { useEffect } from 'react'
import { useDetailsContext, useDialogContext, useLayoutContext, useMediaContext, useSelectionContext } from '../providers'
import useKeyboard from '../hooks/keyboard'
import { ELayout } from '../types/app'
import { GalleryView, ListView } from './index'

export const Media = () => {
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const dialog = useDialogContext()
    const layout = useLayoutContext()
    const media = useMediaContext()

    useEffect(() => {
        if (details.medium && Object.keys(details.medium).length && media) {
            details.setMedium(media.media.find((m) => m.id === details.medium.id))
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

    return <>
        {layout.layout}
    </>
}
