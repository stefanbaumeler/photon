import { Check } from '@/components'
import { ESelectionMode } from '@/types/app'
import { useSelectionContext } from '@/providers'
import { useTeaserContext } from './TeaserContext'

export const TeaserTopLeftCorner = () => {
    const selection = useSelectionContext()
    const {
        id, selectable
    } = useTeaserContext()

    if (!selectable) {
        return <></>
    }

    const select = () => {
        selection.toggle(id)
    }

    return <div
        className="teaser__check"
    >
        <Check
            onClick={select}
            ready={selection.mode !== ESelectionMode.OFF}
            checked={selection.isSelected(id)}
            remove={selection.mode === ESelectionMode.DELETE}
            testId="teaser-check"
        />
    </div>
}
