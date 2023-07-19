import { useDetailsContext, useDialogContext, useLayoutContext, useSearchContext, useSelectionContext } from '@/providers'
import { useKeyboard } from '@/hooks/keyboard'
import { ELayout } from '@/types/app'
import { GalleryView, ListView, MapView } from '.'

export const Media = () => {
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const dialog = useDialogContext()
    const layout = useLayoutContext()
    const { hits: media } = useSearchContext()

    useKeyboard('keydown', 'Escape', () => {
        if (!details.active && !dialog.active) {
            selection.clear()
        }
    })

    if (layout.layout === ELayout.GALLERY) {
        return <GalleryView />
    }

    if (layout.layout === ELayout.LIST) {
        return <ListView elements={media} />
    }

    if (layout.layout === ELayout.MAP) {
        return <MapView />
    }

    return <></>
}
