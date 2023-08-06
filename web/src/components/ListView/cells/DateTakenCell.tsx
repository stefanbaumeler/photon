import { useListItemContext } from '../ListItemContext'
import { formatDate } from '@/util/date'
import { isMedium } from '@/util/is'
import { ListCell } from '../ListCell'

export const DateTakenCell = () => {
    const { element } = useListItemContext()

    const cell = 'dateTaken'

    if (!isMedium(element)) {
        return <></>
    }

    return <ListCell cell={cell}>
        {formatDate(element.dateTaken)}
    </ListCell>
}
