import { ListCell } from '../ListCell'
import { useTranslation } from 'react-i18next'

export const DateTakenHeader = () => {
    const { t } = useTranslation('listHeaders')

    const cell = 'dateTaken'

    return <ListCell cell={cell}>
        {t(cell)}
    </ListCell>
}
