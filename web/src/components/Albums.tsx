import { TAlbum } from '@photon/schema'
import { ListView } from '.'
import { ELayout } from 'web/src/types/app'
import { useDialogContext, useLayoutContext, useSelectionContext } from 'web/src/providers'
import { GridView } from 'web/src/components/GridView'
import useKeyboard from 'web/src/hooks/keyboard'

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
    }, [dialog.active])

    if (layout.albumsLayout === ELayout.GRID) {
        return <GridView elements={albums} />
    }

    if (layout.albumsLayout === ELayout.LIST) {
        return <ListView elements={albums} />
    }
}
