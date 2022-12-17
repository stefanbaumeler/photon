import * as Icons from '@mdi/js'
import { Check, Dropdown, IconButton } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ELayout, EMediumStatus, ESelectionMode } from '@/types/app'
import { useContext, useState } from 'react'
import { DetailsContext, LayoutContext, SelectionContext } from '@/providers'
import Tippy from '@tippyjs/react'
import useSetAlbumCover from '@/hooks/set-album-cover'
import useMoveToTrashDialog from '@/dialogs/move-to-trash'
import useDeleteMediaDialog from '@/dialogs/delete-media'
import useRestoreMediaDialog from '@/dialogs/restore-media'
import useRotate from '@/hooks/rotate'
import { useRouter } from 'next/router'
import useSetMediaStatus from '@/hooks/set-status'

const DetailsActions = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const idMedium = Array.isArray(router.query.idMedium) ? router.query.idMedium.join('') : router.query.idMedium
    const idAlbum = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum

    const details = useContext(DetailsContext)
    const selection = useContext(SelectionContext)
    const layout = useContext(LayoutContext)

    const moveToTrashDialog = useMoveToTrashDialog(details.medium)
    const deleteMediaDialog = useDeleteMediaDialog()
    const restoreMediaDialog = useRestoreMediaDialog(details.medium)

    const archive = useSetMediaStatus(details.medium, details.medium.status === EMediumStatus.ARCHIVED ? EMediumStatus.DEFAULT : EMediumStatus.ARCHIVED)

    const rotate = useRotate(details.medium.id)

    const src = details.medium.filenameDisk ? `${process.env.NEXT_PUBLIC_UPLOADS_DIR}${details.medium.filenameDisk}` : '#'

    const select = () => {
        selection.toggle(details.medium)
    }

    if (selection.mode === ESelectionMode.SELECT) {
        return <Tippy
            content={t(ETrans.SELECT)}
        >
            <Check
                cy="details-select"
                onClick={select}
                ready={true}
                checked={selection.isSelected(details.medium)}
                boxSize={48}
                hover={true}
                round={layout.layout !== ELayout.LIST}
            />
        </Tippy>
    }

    const moreItems = [
        {
            label: t(ETrans.DELETE),
            callback: moveToTrashDialog
        },
        {
            label: t(ETrans.ROTATE_LEFT),
            callback: rotate
        },
        {
            label: details.medium.status === EMediumStatus.ARCHIVED ? t(ETrans.UNARCHIVE) : t(ETrans.MOVE_TO_ARCHIVE),
            callback: archive
        }
    ]

    if (idAlbum) {
        moreItems.push({
            label: t(ETrans.SET_AS_ALBUM_COVER),
            callback: useSetAlbumCover(idAlbum, idMedium)
        })
    }

    const [moreActive, setMoreActive] = useState(false)

    const RegularActions = () => {
        return <>
            <IconButton
                href={`${src}?download=true`}
                hint={t(ETrans.DOWNLOAD)}
                white={true}
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
                    white={true}
                    onClick={() => setMoreActive(!moreActive)}
                />
            </Dropdown>
        </>
    }

    const TrashActions = () => {
        return <>
            <IconButton
                label={t(ETrans.DELETE)}
                onClick={deleteMediaDialog}
                icon={Icons.mdiDeleteForever}
                white={true}
            />
            <IconButton
                label={t(ETrans.RESTORE)}
                onClick={restoreMediaDialog}
                icon={Icons.mdiDeleteRestore}
                white={true}
            />
        </>
    }

    const Actions = () => {
        if (router.pathname === '/trash') {
            return <TrashActions />
        }
        else {
            return <RegularActions />
        }
    }

    return <>
        <Actions />
    </>
}

export default DetailsActions
