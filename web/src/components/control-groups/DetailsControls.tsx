import * as Icons from '@mdi/js'
import { Button, Check, Dropdown } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EKeyboardScope, ELayout, ESelectionMode } from '@/types/app'
import { useState } from 'react'
import { useDetailsContext, useLayoutContext, useSelectionContext } from '@/providers'
import Tippy from '@tippyjs/react'
import { useRouter } from 'next/router'
import { TrashControls } from '@/components/control-groups'
import { FavoriteControl,
    DeleteControl,
    ArchiveControl,
    RotateControl,
    SetAlbumCoverControl,
    DownloadMediaControl } from '@/components/controls'
import { useQAlbum } from '@photon/schema'
import { useHotkey } from '@/hooks/hotkey'

export const DetailsControls = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const idAlbum = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum

    const [albumQuery] = useQAlbum({
        variables: {
            id: idAlbum
        },
        pause: !router.isReady || !idAlbum
    })

    const details = useDetailsContext()
    const selection = useSelectionContext()
    const layout = useLayoutContext()

    const medium = details.medium ?? details.placeholder

    const [moreActive, setMoreActive] = useState(false)

    const select = () => {
        selection.toggle(details.medium.id)
    }

    useHotkey(' ', select, EKeyboardScope.details, selection.selected.size > 0)

    if (selection.mode === ESelectionMode.SELECT) {
        return <Tippy
            content={t(ETrans.SELECT)}
        >
            <Check
                testId="details-select"
                onClick={select}
                ready
                checked={selection.isSelected(medium.id)}
                boxSize={48}
                hover
                round={layout.layout !== ELayout.LIST}
            />
        </Tippy>
    }

    const moreItems = [
        <DeleteControl
            dropdown
            shortcut
            elements={[medium.id]}
            callback={() => setMoreActive(false)}
            key={0}
        />,
        <RotateControl
            dropdown
            shortcut
            callback={() => setMoreActive(false)}
            key={1}
        />,
        <ArchiveControl
            dropdown
            shortcut
            media={[medium.id]}
            callback={() => setMoreActive(false)}
            key={2}
        />
    ]

    if (idAlbum) {
        moreItems.push(<SetAlbumCoverControl
            dropdown
            shortcut
            album={albumQuery.data?.album.id}
            medium={medium.id}
            callback={() => setMoreActive(false)}
        />)
    }

    return router.pathname === '/trash' ? <TrashControls white /> : <>
        <DownloadMediaControl
            elements={[medium.id]}
            shortcut
        />
        <FavoriteControl
            media={[medium.id]}
            shortcut
        />
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
                onClick={() => setMoreActive(true)}
            />
        </Dropdown>
    </>
}
