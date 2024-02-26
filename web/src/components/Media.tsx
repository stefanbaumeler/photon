import { useDetailsContext, useDialogContext, useLayoutContext, useSearchContext, useSelectionContext } from '@/providers'
import { useKeyboard } from '@/hooks'
import { ELayout } from '@/types/app'
import { GalleryView, ListView, MapView } from '.'
import { TMedium } from '@photon/schema'

export const Media = () => {
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const dialog = useDialogContext()
    const layout = useLayoutContext()
    const { hits: media } = useSearchContext()

    useKeyboard('keydown', 'Escape', () => {
        if (!details.active && !dialog.active && selection.selected.size) {
            selection.clear()
        }
    })

    if (layout.layout === ELayout.GALLERY) {
        return <GalleryView />
    }

    if (layout.layout === ELayout.LIST) {
        return <ListView elements={media as TMedium[]} />
    }

    if (layout.layout === ELayout.MAP) {
        return <MapView />
    }

    return <></>
}
