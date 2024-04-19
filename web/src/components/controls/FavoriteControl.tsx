import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useAddToFavorites, useRemoveFromFavorites } from '@/hooks'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { useHotkey } from '@/hooks/hotkey'
import { useQFavorites } from '@photon/schema'

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
    const [{  data: favorites }] = useQFavorites()

    const favoriteIds = favorites?.favorites.map((favorite) => favorite.id)

    const hasUnfavorited = !!media.filter((medium) => !favoriteIds?.find((favorite) => favorite === medium)).length

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

    useHotkey({
        key: 'f',
        callback: action,
        condition: !!shortcut
    })

    const testId = hasUnfavorited ? 'favorite' : 'unfavorite'
    const label = t(hasUnfavorited ? ETrans.FAVORITE : ETrans.UNFAVORITE)
    const icon = hasUnfavorited ? Icons.mdiStarOutline : Icons.mdiStar

    return dropdown ? <DropdownItem item={{
        testId,
        label,
        callback: action,
        shortcut: shortcut ? 'F' : undefined
    }}
    /> : <Button
        testId={testId}
        onClick={action}
        hint={label}
        shortcut={shortcut ? 'F' : undefined}
        appearance={details.active ? {
            text: 'light'
        } : undefined}
        icon={icon}
    />
}
