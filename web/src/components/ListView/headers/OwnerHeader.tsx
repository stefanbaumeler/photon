import { useTranslation } from 'react-i18next'
import { ListCell } from '../ListCell'

export const OwnerHeader = () => {
    const { t } = useTranslation('listHeaders')

    const cell = 'owner'

    return <ListCell cell={cell}>
        {t(cell)}
    </ListCell>
}
