import { Button } from '@/components'
import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ListCell } from '../ListCell'

export const FavoriteHeader = () => {
    const { t } = useTranslation()

    const cell = 'favorite'

    return <ListCell cell={cell}>
        <Button
            hint={t(ETrans.FAVORITES)}
            icon={Icons.mdiStarOutline}
        />
    </ListCell>
}
