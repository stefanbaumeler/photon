import * as Icons from '@mdi/js'
import { Button } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import useAddToFavorites from '@/hooks/add-to-favorites'
import useRemoveFromFavorites from '@/hooks/remove-from-favorites'
import { TMedium } from '@photon/schema'
import { useKeyboard } from '@/hooks/keyboard'

type Props = {
    medium: TMedium
}

export const FavoriteControl = ({ medium }: Props) => {
    const { t } = useTranslation()

    const isFavorite = medium.favoredBy?.length !== 0
    const id = medium.id

    const addToFavorites = useAddToFavorites([id])
    const removeFromFavorites = useRemoveFromFavorites([id])

    useKeyboard('keyup', 'f', isFavorite ? removeFromFavorites : addToFavorites)

    const ConditionalButton = () => {
        if (!isFavorite) {
            return <Button
                testId={'details-favorite'}
                onClick={isFavorite ? removeFromFavorites : addToFavorites}
                hint={t(ETrans.FAVORITE)}
                appearance={{
                    text: 'light'
                }}
                icon={Icons.mdiStarOutline}
            />
        }

        return <Button
            testId={'details-unfavorite'}
            onClick={isFavorite ? removeFromFavorites : addToFavorites}
            hint={t(ETrans.UNFAVORITE)}
            appearance={{
                text: 'light'
            }}
            icon={Icons.mdiStar}
        />
    }

    return <ConditionalButton />
}
