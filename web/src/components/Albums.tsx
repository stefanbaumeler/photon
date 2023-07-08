import { TAlbum } from '@photon/schema'
import { ListView } from '.'
import { ELayout } from '@/types/app'
import { useDialogContext, useLayoutContext, useSelectionContext } from '@/providers'
import { GridView } from '@/components/GridView'
import { useKeyboard } from '@/hooks/keyboard'

type Props = {
    albums: TAlbum[]
}

export const Albums = ({ albums }: Props) => {
    const layout = useLayoutContext()
    const dialog = useDialogContext()
    const selection = useSelectionContext()

    useKeyboard('keydown', 'Escape', () => {
        if (!dialog.active) {
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
