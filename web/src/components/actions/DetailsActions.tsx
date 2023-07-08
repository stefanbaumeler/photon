import * as Icons from '@mdi/js'
import { Button, Check, Dropdown } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ELayout, EMediumStatus, ESelectionMode } from '@/types/app'
import { useState } from 'react'
import { useDetailsContext, useLayoutContext, useSelectionContext } from '@/providers'
import Tippy from '@tippyjs/react'
import useSetAlbumCover from '@/hooks/set-album-cover'
import useMoveToTrashDialog from '@/dialogs/move-to-trash'
import useRotate from '@/hooks/rotate'
import { useRouter } from 'next/router'
import useSetMediaStatus from '@/hooks/set-status'
import TrashActions from './TrashActions'
import { useKeyboard } from '@/hooks/keyboard'
import { FavoriteControl } from '@/components/controls/FavoriteControl'

export const DetailsActions = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const idMedium = Array.isArray(router.query.idMedium) ? router.query.idMedium.join('') : router.query.idMedium
    const idAlbum = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum

    const details = useDetailsContext()
    const selection = useSelectionContext()
    const layout = useLayoutContext()

    const moveToTrashDialog = useMoveToTrashDialog(details.medium)

    const archive = useSetMediaStatus(details.medium, details.medium.status === EMediumStatus.ARCHIVED ? EMediumStatus.ALL : EMediumStatus.ARCHIVED)

    const rotate = useRotate(details.medium.id)
    const setAlbumCover = useSetAlbumCover(idAlbum, idMedium)
    const [moreActive, setMoreActive] = useState(false)

    const src = details.medium.filenameDisk ? `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${details.medium.filenameDisk}` : '#'

    const select = () => {
        selection.toggle(details.medium)
    }

    useKeyboard('keyup', 'a', archive)

    if (selection.mode === ESelectionMode.SELECT) {
        return <Tippy
            content={t(ETrans.SELECT)}
        >
            <Check
                testId="details-select"
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
            callback: rotate,
            testId: 'rotate'
        },
        {
            label: details.medium.status === EMediumStatus.ARCHIVED ? t(ETrans.UNARCHIVE) : t(ETrans.MOVE_TO_ARCHIVE),
            callback: archive
        }
    ]

    if (idAlbum) {
        moreItems.push({
            label: t(ETrans.SET_AS_ALBUM_COVER),
            callback: setAlbumCover
        })
    }

    const RegularActions = () => {
        return <>
            <Button
                href={`${src}?download=true`}
                hint={t(ETrans.DOWNLOAD)}
                appearance={{
                    text: 'light'
                }}
                icon={Icons.mdiTrayArrowDown}
            />
            <FavoriteControl medium={details.medium} />
            <Dropdown
                items={moreItems}
                active={moreActive}
                onClickOutside={() => setMoreActive(false)}
            >
                <Button
                    testId={'details-more'}
                    hint={t(ETrans.MORE_OPTIONS)}
                    icon={Icons.mdiDotsVertical}
                    appearance={{
                        text: 'light'
                    }}
                    onClick={() => setMoreActive(!moreActive)}
                />
            </Dropdown>
        </>
    }

    const Actions = () => {
        if (router.pathname === '/trash') {
            return <TrashActions white={true} />
        }
        else {
            return <RegularActions />
        }
    }

    return <>
        <Actions />
    </>
}
