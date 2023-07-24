import * as Icons from '@mdi/js'
import { Button } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EEditState, ESelectionMode } from '@/types/app'
import { useEditContext, useSelectionContext } from '@/providers'

export const EditControls = () => {
    const { t } = useTranslation()

    const edit = useEditContext()
    const selection = useSelectionContext()

    const confirm = () => {
        edit.setState(EEditState.CONFIRMED)
    }

    const discard = () => {
        edit.setState(EEditState.DISCARDED)
    }

    if (selection.mode !== ESelectionMode.DELETE && selection.mode !== ESelectionMode.SINGLE) {
        return <></>
    }

    return <div className="actions">
        <Button
            testId="save-changes"
            hint={t(ETrans.SAVE)}
            icon={Icons.mdiCheck}
            onClick={confirm}
        />
        <Button
            testId="discard-changes"
            hint={t(ETrans.DISCARD)}
            onClick={discard}
            icon={Icons.mdiClose}
        />
    </div>
}
