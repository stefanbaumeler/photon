import { useTranslation } from 'react-i18next'
import { ListCell } from '../ListCell'

export const MediaCountHeader = () => {
    const { t } = useTranslation('listHeaders')

    const cell = 'mediaCount'

    return <ListCell cell={cell}>
        {t(cell)}
    </ListCell>
}
