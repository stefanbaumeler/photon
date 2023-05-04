import { Check } from '@/components'
import { ESelectionMode } from '@/types/app'
import { useSelectionContext } from '@/providers'
import { useTeaserContext } from './TeaserContext'

export const TeaserTopLeftCorner = () => {
    const selection = useSelectionContext()
    const { element } = useTeaserContext()

    const select = () => {
        selection.toggle(element)
    }

    return <div
        className="teaser__check"
    >
        <Check
            onClick={select}
            ready={selection.mode !== ESelectionMode.OFF}
            checked={selection.isSelected(element)}
            remove={selection.mode === ESelectionMode.DELETE}
            testId="teaser-check"
        />
    </div>
}
