import { useTranslation } from 'react-i18next'
import { ListCell } from '../ListCell'

export const MimetypeHeader = () => {
    const { t } = useTranslation('listHeaders')

    const cell = 'mimetype'

    return <ListCell cell={cell}>
        {t(cell)}
    </ListCell>
}
