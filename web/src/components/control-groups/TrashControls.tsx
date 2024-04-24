import { RestoreControl } from '@/components/controls/RestoreControl'
import { DeleteControl } from '@/components/controls/DeleteControl'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

export const TrashControls = () => {
    const selection = useSelectionContext()
    const { medium } = useMediumFromRouter()
    const media = medium ? [medium.id] : [...selection.selected]

    return <>
        <DeleteControl media={media} />
        <RestoreControl
            media={media}
        />
    </>
}
