import * as Icons from '@mdi/js'
import { TAlbum, TMedium } from '@photon/schema'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import useDeleteAlbumDialog from '@/dialogs/delete-album'
import useMoveToTrashDialog from '@/dialogs/move-to-trash'
import { isAlbum, isMedium } from '@/util/is'
import useDownload from '@/hooks/download'
import { ETrans } from '@/types/translations'
import useRotate from '@/hooks/rotate'
import useSetMediaStatus from '@/hooks/set-status'
import { EMediumStatus } from '@/types/app'
import { Button, Dropdown } from '@/components'

type Props = {
    element: TMedium | TAlbum
}

export const ListItemActions = ({ element }: Props) => {
    const { t } = useTranslation()

    const [moreActive, setMoreActive] = useState(false)

    const moveToTrashDialog = isMedium(element) ? useMoveToTrashDialog(element) : useDeleteAlbumDialog(element.id)
    const download = useDownload(isAlbum(element) ? element.albumMedia.map(({ idMedium }) => idMedium) : [element.id])

    const moreItems = [
        {
            label: t(ETrans.DELETE),
            callback: () => {
                moveToTrashDialog()
                setMoreActive(false)
            }
        }
    ]

    if (isMedium(element)) {
        const rotate = useRotate(element.id)
        const archive = useSetMediaStatus(element, element.status === EMediumStatus.ARCHIVED ? EMediumStatus.ALL : EMediumStatus.ARCHIVED)

        moreItems.push({
            label: t(ETrans.ROTATE_LEFT),
            callback: () => {
                rotate()
                setMoreActive(false)
            }
        })

        moreItems.push({
            label: element.status === EMediumStatus.ARCHIVED ? t(ETrans.UNARCHIVE) : t(ETrans.MOVE_TO_ARCHIVE),
            callback: () => {
                archive()
                setMoreActive(false)
            }
        })
    }

    return <div className="actions">
        <Button
            hint={t(ETrans.DOWNLOAD)}
            icon={Icons.mdiTrayArrowDown}
            onClick={download}
        />
        <Dropdown
            items={moreItems}
            active={moreActive}
            onClickOutside={() => setMoreActive(false)}
        >
            <Button
                hint={t(ETrans.MORE_OPTIONS)}
                icon={Icons.mdiDotsVertical}
                onClick={() => setMoreActive(!moreActive)}
            />
        </Dropdown>
    </div>
}
