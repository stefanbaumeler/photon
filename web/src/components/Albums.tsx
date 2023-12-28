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
        return <GridView elements={albums} />
    }

    if (layout.albumsLayout === ELayout.LIST) {
        return <ListView elements={albums} />
    }
}
