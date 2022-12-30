import { useContext, useEffect } from 'react'
import { DetailsContext, DialogContext, LayoutContext, MediaContext, SelectionContext } from '@/providers'
import useKeyboard from '@/hooks/keyboard'
import { ELayout } from '@/types/app'
import { GalleryView, ListView } from '@/components'

export const Media = () => {
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)
    const dialog = useContext(DialogContext)
    const layout = useContext(LayoutContext)
    const media = useContext(MediaContext)

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
