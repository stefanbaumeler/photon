import { useSelectionContext } from '@/providers'
import { BulkMediaActions } from './BulkMediaActions'
import { BulkAlbumsActions } from './BulkAlbumsActions'
import { isAlbums, isMedia } from '@/util/is'

export const BulkActions = () => {
    const selection = useSelectionContext()
    const elements = [...selection.selected]

    if (!elements.length) {
        return <></>
    }

    if (isMedia(elements)) {
        return <BulkMediaActions selected={elements} />
    }

    if (isAlbums(elements)) {
        return <BulkAlbumsActions selected={elements} />
    }
}
