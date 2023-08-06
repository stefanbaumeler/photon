import { useListItemContext } from '../ListItemContext'
import { ETrans } from '@/types/translations'
import { isMedium } from '@/util/is'
import { useTranslation } from 'react-i18next'
import { ListCell } from '@/components/ListView/ListCell'

export const MediaCountCell = () => {
    const { t } = useTranslation()
    const { element } = useListItemContext()

    const cell = 'mediaCount'

    if (isMedium(element)) {
        return <></>
    }

    return <ListCell cell={cell}>
        {`${element.media.length} `}
        {t(ETrans.ELEMENT, {
            count: element.media.length
        })}
    </ListCell>
}
