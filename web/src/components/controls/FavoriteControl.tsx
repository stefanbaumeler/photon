import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useAddToFavorites, useRemoveFromFavorites, useKeyboard } from '@/hooks'
import { useDetailsContext, useSelectionContext, useUserContext } from '@/providers'

type Props = {
    media: string[]
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const FavoriteControl = ({
    media, dropdown, shortcut, callback
}: Props) => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const selection = useSelectionContext()
    const { favorites } = useUserContext()

    const favoriteIds = favorites?.map((favorite) => favorite.id)

    const hasUnfavorited = !!media.filter((medium) => !favoriteIds.find((favorite) => favorite === medium)).length

    const addToFavorites = useAddToFavorites(media)
    const removeFromFavorites = useRemoveFromFavorites(media)

    const action = () => {
        if (hasUnfavorited) {
            addToFavorites()
        }
        else {
            removeFromFavorites()
        }

        if (selection.selected.size) {
            selection.clear()
        }

        callback && callback()
    }

    useKeyboard('keyup', 'f', shortcut && action)

    const testId = hasUnfavorited ? 'favorite' : 'unfavorite'
    const label = t(hasUnfavorited ? ETrans.FAVORITE : ETrans.UNFAVORITE)
    const icon = hasUnfavorited ? Icons.mdiStarOutline : Icons.mdiStar

    const ConditionalButton = () => {
        if (dropdown) {
            return <DropdownItem item={{
                testId,
                label,
                callback: action,
                shortcut: shortcut && 'F'
            }}
            />
        }

        return <Button
            testId={testId}
            onClick={action}
            hint={label}
            shortcut={shortcut && 'F'}
            appearance={details.active && {
                text: 'light'
            }}
            icon={icon}
        />
    }

    return <ConditionalButton />
}
