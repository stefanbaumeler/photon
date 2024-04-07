import { useLayoutContext, useSearchContext } from '@/providers'
import { ELayout } from '@/types/app'
import { GalleryView, ListView, MapView } from '../index'

export const Media = () => {
    const layout = useLayoutContext()
    const { hits: media } = useSearchContext()

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
