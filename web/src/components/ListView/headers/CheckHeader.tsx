import { Check } from '@/components'
import { ListCell } from '../ListCell'

export const CheckHeader = () => {
    const cell = 'selectable'

    return <ListCell cell={cell}>
        <Check
            ready={true}
            checked={false}
            round={false}
            iconSize={1.125}
            borderColor="#888899"
            boxSize={40}
            blankHoverColor="#888899"
        />
    </ListCell>
}
