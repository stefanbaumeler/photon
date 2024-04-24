import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { DropdownItem } from '@/components/shared/Dropdown/components/DropdownItem'
import { useCreateAlbum } from '@/hooks/create-album'
import { Button } from '@/components/shared/Button'

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
        shortcut={shortcut ? 'C' : undefined}
        icon={Icons.mdiPlus}
        onClick={action}
    />
}
