import { useListItemContext } from '../ListItemContext'
import { isMedium } from '@/util/is'
import { FavoriteControl } from '@/components/controls'
import { ListCell } from '../ListCell'

export const FavoriteCell = () => {
    const { element } = useListItemContext()

    const cell = 'favorite'

    if (!isMedium(element)) {
        return <></>
    }

    return <ListCell cell={cell}>
        <FavoriteControl media={[element]} />
    </ListCell>
}
