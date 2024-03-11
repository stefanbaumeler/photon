import { Check } from '@/components'
import { ESelectionMode } from '@/types/app'
import { useSelectionContext } from '@/providers'
import { useTeaserContext } from '..'

export const TeaserTopLeftCorner = () => {
    const selection = useSelectionContext()
    const {
        id, selectable
    } = useTeaserContext()

    return selectable ? <div
        className="teaser__check"
    >
        <Check
            onClick={() => selection.toggle(id)}
            ready={selection.mode !== ESelectionMode.OFF}
            checked={selection.isSelected(id)}
            remove={selection.mode === ESelectionMode.DELETE}
            testId="teaser-check"
        />
    </div> : null
}
