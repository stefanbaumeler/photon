import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useHotkey } from '@/hooks/hotkey'
import { useQFavorites } from '@photon/schema/dist/client'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useAddToFavorites } from '@/hooks/add-to-favorites'
import { useRemoveFromFavorites } from '@/hooks/remove-from-favorites'
import { DropdownItem } from '@/components/shared/Dropdown/components/DropdownItem'
import { Button } from '@/components/shared/Button'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

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
    const { medium } = useMediumFromRouter()

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
        appearance={medium ? {
            text: 'light'
        } : undefined}
        icon={icon}
    />
}
