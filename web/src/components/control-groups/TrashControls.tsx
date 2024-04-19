import { useDetailsContext, useSelectionContext } from '@/providers'
import { RestoreControl } from '@/components/controls/RestoreControl'
import { DeleteControl } from '@/components/controls/DeleteControl'

export const TrashControls = () => {
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const media = details.active && details.medium?.id ? [details.medium.id] : [...selection.selected]

    return <>
        <DeleteControl media={media} />
        <RestoreControl
            media={media}
        />
    </>
}
