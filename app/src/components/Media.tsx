import { useEffect } from 'react'
import { useDetailsContext, useDialogContext, useLayoutContext, useSelectionContext } from '@/providers'
import useKeyboard from '../hooks/keyboard'
import { ELayout } from '@/types/app'
import { GalleryView, ListView } from './index'
import { useHits } from 'react-instantsearch-hooks-web'
import { TMedium } from '@photon/schema'

export const Media = () => {
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const dialog = useDialogContext()
    const layout = useLayoutContext()
    const hits = useHits<TMedium>()
    const media = hits.hits

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

    return <>
        {layout.layout}
    </>
}
