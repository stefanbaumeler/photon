import { useDetailsContext, useLayoutContext, useSearchContext, useSelectionContext } from '@/providers'
import { useKeyboard } from '@/hooks'
import { ELayout } from '@/types/app'
import { GalleryView, ListView, MapView } from '.'

export const Media = () => {
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const layout = useLayoutContext()
    const { hits: media } = useSearchContext()

    useKeyboard('keydown', 'Escape', () => {
        if (!details.active && selection.selected.size) {
            selection.clear()
        }
    })

    return <>
        {layout.layout === ELayout.GALLERY ? <GalleryView elements={media} /> : null}
        {layout.layout === ELayout.LIST ? <ListView media={media.map((medium) => {
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
        /> : null}
        {layout.layout === ELayout.MAP ? <MapView /> : null}
    </>
}
