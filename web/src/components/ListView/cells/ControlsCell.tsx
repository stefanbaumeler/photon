import { useListItemContext } from '../ListItemContext'
import { ListItemControls } from '@/components/control-groups'
import { ListCell } from '../ListCell'

export const ControlsCell = () => {
    const { element } = useListItemContext()

    const cell = 'controls'

    return <ListCell
        cell={cell}
        shouldOpenOnClick={false}
    >
        <ListItemControls
            element={element}
        />
    </ListCell>
}
