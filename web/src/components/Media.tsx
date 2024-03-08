import { useDetailsContext, useDialogContext, useLayoutContext, useSearchContext, useSelectionContext } from '@/providers'
import { useKeyboard } from '@/hooks'
import { ELayout } from '@/types/app'
import { GalleryView, ListView, MapView } from '.'

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
        return <GalleryView elements={media} />
    }

    if (layout.layout === ELayout.LIST) {
        return <ListView media={media.map((medium) => {
            return {
                id: medium.id,
                cover: medium,
                title: medium.title,
                owner: medium.owner,
                favoredBy: medium.favoredBy.length,
                dateTaken: medium.dateTaken,
                mimetype: medium.mimetype
            }
        })}
        />
    }

    if (layout.layout === ELayout.MAP) {
        return <MapView />
    }

    return <></>
}
