import * as Icons from '@mdi/js'
import { Dropdown, IconButton } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EMediumStatus } from '@/types/app'
import { useState } from 'react'
import { TMedium } from '@/types/api'
import useMoveToTrashDialog from '@/dialogs/move-to-trash'
import useRotate from '@/hooks/rotate'
import useSetMediaStatus from '@/hooks/set-status'

type Props = {
    medium: TMedium
}

const ListItemActions = ({ medium }: Props) => {
    const { t } = useTranslation()

    const [moreActive, setMoreActive] = useState(false)

    const moveToTrashDialog = useMoveToTrashDialog(medium)

    const rotate = useRotate(medium.id)
    const archive = useSetMediaStatus(medium, medium.status === EMediumStatus.ARCHIVED ? EMediumStatus.DEFAULT : EMediumStatus.ARCHIVED)

    const moreItems = [
        {
            label: t(ETrans.DELETE),
            callback: moveToTrashDialog
        },
        {
            label: t(ETrans.ROTATE_LEFT),
            callback: () => {
                rotate()
                setMoreActive(false)
            }
        },
        {
            label: medium.status === EMediumStatus.ARCHIVED ? t(ETrans.UNARCHIVE) : t(ETrans.MOVE_TO_ARCHIVE),
            callback: archive
        }
    ]

    const src = medium.filenameDisk ? `${process.env.NEXT_PUBLIC_UPLOADS_DIR}${medium.filenameDisk}` : '#'

    return <div className="actions">
        <IconButton
            href={`${src}?download=true`}
            hint={t(ETrans.DOWNLOAD)}
            icon={Icons.mdiTrayArrowDown}
        />
        <Dropdown
            items={moreItems}
            active={moreActive}
            onClickOutside={() => setMoreActive(false)}
        >
            <IconButton
                hint={t(ETrans.MORE_OPTIONS)}
                icon={Icons.mdiDotsVertical}
                onClick={() => setMoreActive(!moreActive)}
            />
        </Dropdown>
    </div>
}

export default ListItemActions
