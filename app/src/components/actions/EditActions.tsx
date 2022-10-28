import * as Icons from '@mdi/js'
import { IconButton } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EEditState, ESelectionMode } from '@/types/app'
import { useContext } from 'react'
import { EditContext, SelectionContext } from '@/providers'

const EditActions = () => {
    const { t } = useTranslation()

    const edit = useContext(EditContext)

    const selection = useContext(SelectionContext)

    const confirm = () => {
        edit.setState(EEditState.CONFIRMED)
    }

    const discard = () => {
        edit.setState(EEditState.DISCARDED)
    }

    if (selection.mode !== ESelectionMode.DELETE) {
        return <></>
    }

    return <div className="actions">
        <IconButton
            cy="save-changes"
            hint={t(ETrans.SAVE)}
            icon={Icons.mdiCheck}
            onClick={confirm}
        />
        <IconButton
            cy="discard-changes"
            hint={t(ETrans.DISCARD)}
            onClick={discard}
            icon={Icons.mdiClose}
        />
    </div>
}

export default EditActions
