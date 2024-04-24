'use client'

import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EKeyboardScope, ELayout, ESelectionMode } from '@/types/app'
import { useState } from 'react'
import Tippy from '@tippyjs/react'
import { useParams, usePathname } from 'next/navigation'
import { useQAlbum } from '@photon/schema/dist/client'
import { useHotkey } from '@/hooks/hotkey'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useLayoutContext } from '@/providers/LayoutProvider'
import { Check } from '@/components/shared/Check'
import { MoveToTrashControl } from '@/components/controls/MoveToTrashControl'
import { RotateControl } from '@/components/controls/RotateControl'
import { ArchiveControl } from '@/components/controls/ArchiveControl'
import { SetAlbumCoverControl } from '@/components/controls/SetAlbumCoverControl'
import { TrashControls } from '@/components/control-groups/TrashControls'
import { DownloadMediaControl } from '@/components/controls/DownloadMediaControl'
import { FavoriteControl } from '@/components/controls/FavoriteControl'
import { Dropdown } from '@/components/shared/Dropdown'
import { Button } from '@/components/shared/Button'
import { useInfobarContext } from '@/components/shared/Infobar/components/InfobarContext'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

export const DetailsControls = () => {
    const { t } = useTranslation()
    const pathname = usePathname()
    const params = useParams()

    const idAlbum = Array.isArray(params.idAlbum) ? params.idAlbum[0] : params.idAlbum

    const [albumQuery] = useQAlbum({
        variables: {
            id: idAlbum ?? ''
        },
        pause: !idAlbum
    })

    const selection = useSelectionContext()
    const layout = useLayoutContext()
    const infobar = useInfobarContext()
    const { medium } = useMediumFromRouter()

    const [moreActive, setMoreActive] = useState(false)

    const select = () => {
        if (medium) {
            selection.toggle(medium.id)
        }
    }

    useHotkey({
        key: ' ',
        callback: select,
        scopes: EKeyboardScope.details,
        condition: selection.selected.size > 0
    })

    if (!medium) {
        return null
    }

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
        <MoveToTrashControl
            dropdown
            shortcut
            elements={[medium.id]}
            callback={() => setMoreActive(false)}
            key={0}
        />,
        <RotateControl
            medium={medium.id}
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

    return pathname.startsWith('/trash') ? <TrashControls /> : <>
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
                testId="details-more"
                hint={t(ETrans.MORE_OPTIONS)}
                icon={Icons.mdiDotsVertical}
                appearance={{
                    text: 'light'
                }}
                onClick={() => setMoreActive(true)}
            />
        </Dropdown>
        {infobar.infobarVisible ? null : <Button
            testId="show-infos"
            hint={t(ETrans.SHOW_THING, {
                thing: t(ETrans.INFO_PLURAL)
            })}
            appearance={{
                text: 'light'
            }}
            onClick={infobar.showInfobar}
            icon={Icons.mdiInformation}
        />}
    </>
}
