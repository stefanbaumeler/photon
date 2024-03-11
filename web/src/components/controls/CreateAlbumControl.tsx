import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useCreateAlbum } from '@/hooks'

type Props = {
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const CreateAlbumControl = ({
    dropdown, shortcut, callback
}: Props) => {
    const { t } = useTranslation()

    const createAlbum = useCreateAlbum()

    const action = () => {
        createAlbum()
        callback && callback()
    }

    const label = t(ETrans.CREATE_THING, {
        thing: t(ETrans.ALBUM)
    })

    return dropdown ? <DropdownItem item={{
        testId: 'album-create',
        label,
        callback: action
    }}
    /> : <Button
        testId="album-create"
        hint={label}
        shortcut={shortcut && 'C'}
        icon={Icons.mdiPlus}
        onClick={action}
    />
}
