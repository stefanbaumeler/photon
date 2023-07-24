import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useEmptyTrashDialog } from '@/dialogs'

type Props = {
    dropdown?: boolean
    callback?: () => void
}

export const EmptyTrashControl = ({
    dropdown, callback
}: Props) => {
    const { t } = useTranslation()

    const emptyTrashDialog = useEmptyTrashDialog()

    const action = () => {
        emptyTrashDialog()
        callback && callback()
    }

    if (dropdown) {
        return <DropdownItem item={{
            testId: 'trash-empty',
            label: t(ETrans.EMPTY_TRASH),
            callback: action
        }}
        />
    }

    return <Button
        label={t(ETrans.EMPTY_TRASH)}
        icon={Icons.mdiDeleteForever}
        onClick={action}
        testId="trash-empty"
        appearance={{
            type: 'tertiary'
        }}
    />
}
