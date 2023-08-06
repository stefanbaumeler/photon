import { useListItemContext } from '../ListItemContext'
import { ListCell } from '../ListCell'

export const OwnerCell = () => {
    const { element } = useListItemContext()

    const cell = 'owner'

    return <ListCell cell={cell}>
        {`${element.owner.firstName} ${element.owner.lastName}`}
    </ListCell>
}
