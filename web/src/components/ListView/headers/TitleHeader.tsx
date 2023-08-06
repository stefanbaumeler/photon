import { useTranslation } from 'react-i18next'
import { ListCell } from '../ListCell'

export const TitleHeader = () => {
    const { t } = useTranslation('listHeaders')

    const cell = 'title'

    return <ListCell
        cell={cell}
        grow={true}
    >
        {t(cell)}
    </ListCell>
}

1
