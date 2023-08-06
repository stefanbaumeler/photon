import { Check } from '@/components'
import { ESelectionMode } from '@/types/app'
import { useSelectionContext } from '@/providers'
import { useListItemContext } from '../ListItemContext'
import { ListCell } from '@/components/ListView/ListCell'

export const CheckCell = () => {
    const selection = useSelectionContext()
    const { element } = useListItemContext()

    const cell = 'selectable'

    const select = () => {
        if (selection.mode === ESelectionMode.OFF) {
            selection.setMode(ESelectionMode.SELECT)
        }

        selection.toggle(element)
    }

    return <ListCell
        cell={cell}
        shouldOpenOnClick={false}
    >
        <Check
            onClick={select}
            ready={true}
            checked={selection.isSelected(element)}
            round={false}
            iconSize={1.125}
            borderColor="#888899"
            boxSize={40}
            blankHoverColor="#546119"
            testId="list-check"
        />
    </ListCell>
}
