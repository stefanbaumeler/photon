import { useSelectionContext } from 'web/src/providers'
import { BulkMediaActions } from './BulkMediaActions'
import { BulkAlbumsActions } from './BulkAlbumsActions'
import { TAlbum, TMedium } from '@photon/schema'
import { isAlbum, isMedium } from 'web/src/util/is'

export const BulkActions = () => {
    const selection = useSelectionContext()
    const elements = [...selection.selected]

    if (!elements.length) {
        return <></>
    }

    const isAlbums = (elements: (TAlbum | TMedium)[]): elements is TAlbum[] => {
        return !elements.find((element) => !isAlbum(element))
    }

    const isMedia = (elements: (TAlbum | TMedium)[]): elements is TMedium[] => {
        return !elements.find((element) => !isMedium(element))
    }

    if (isMedia(elements)) {
        return <BulkMediaActions selected={elements} />
    }

    if (isAlbums(elements)) {
        return <BulkAlbumsActions selected={elements} />
    }
}
