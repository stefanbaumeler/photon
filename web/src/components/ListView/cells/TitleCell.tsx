import { useListItemContext } from '../ListItemContext'
import { ListCell } from '../ListCell'

export const TitleCell = () => {
    const { element } = useListItemContext()

    const cell = 'title'

    return <ListCell
        cell={cell}
        grow={true}
    >
        {element.title}
    </ListCell>
}
