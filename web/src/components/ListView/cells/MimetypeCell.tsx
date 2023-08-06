import { useListItemContext } from '../ListItemContext'
import { isMedium } from '@/util/is'
import { ListCell } from '../ListCell'

export const MimetypeCell = () => {
    const { element } = useListItemContext()

    const cell = 'mimetype'

    if (!isMedium(element)) {
        return <></>
    }

    return <ListCell cell={cell}>
        {element.mimetype}
    </ListCell>
}
