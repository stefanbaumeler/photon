import * as Icons from '@mdi/js'
import { Button } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EEditState } from '@/types/app'
import { useEditContext } from '@/providers'

export const EditControls = () => {
    const { t } = useTranslation()

    const edit = useEditContext()

    return <div className="actions">
        <Button
            testId="save-changes"
            hint={t(ETrans.SAVE)}
            icon={Icons.mdiCheck}
            onClick={() => edit.setState(EEditState.CONFIRMED)}
        />
        <Button
            testId="discard-changes"
            hint={t(ETrans.DISCARD)}
            onClick={() => edit.setState(EEditState.DISCARDED)}
            icon={Icons.mdiClose}
        />
    </div>
}
