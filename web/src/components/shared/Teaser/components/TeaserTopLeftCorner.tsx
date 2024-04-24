import { ESelectionMode } from '@/types/app'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useTeaserContext } from '@/components/shared/Teaser/components/TeaserContext'
import { Check } from '@/components/shared/Check'

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
