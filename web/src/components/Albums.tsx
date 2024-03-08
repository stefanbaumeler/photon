import { TQAlbums } from '@photon/schema'
import { ELayout } from '@/types/app'
import { useDialogContext, useLayoutContext, useSelectionContext } from '@/providers'
import { GridView, ListView } from '@/components'
import { useKeyboard } from '@/hooks'

type Props = {
    albums: Required<TQAlbums['albums']>
}

export const Albums = ({ albums }: Props) => {
    const layout = useLayoutContext()
    const dialog = useDialogContext()
    const selection = useSelectionContext()

    useKeyboard('keydown', 'Escape', () => {
        if (!dialog.active && selection.selected.size) {
            selection.clear()
        }
    })

    if (layout.albumsLayout === ELayout.GRID) {
        return <GridView
            albums
            elements={albums.map((album) => {
                return {
                    id: album.id,
                    cover: album.cover,
                    href: `albums/${album.id}`,
                    title: album.title,
                    stack: album.media?.map((medium) => medium.id)
                }
            })}
        />
    }

    if (layout.albumsLayout === ELayout.LIST) {
        return <ListView albums={albums.map((album) => {
            return {
                id: album.id,
                cover: album.cover,
                title: album.title,
                owner: album.owner,
                albumMedia: album.media?.map((medium) => medium.id)
            }
        })}
        />
    }
}
