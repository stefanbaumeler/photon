import * as Icons from '@mdi/js'
import { Button, Check, Dropdown } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ELayout, ESelectionMode } from '@/types/app'
import { useState } from 'react'
import { useDetailsContext, useLayoutContext, useSelectionContext } from '@/providers'
import Tippy from '@tippyjs/react'
import { useRouter } from 'next/router'
import { TrashControls } from '@/components/control-groups'
import { useKeyboard } from '@/hooks/keyboard'
import { FavoriteControl,
    DeleteControl,
    ArchiveControl,
    RotateControl,
    DownloadControl,
    SetAlbumCoverControl } from '@/components/controls'
import { useQAlbum } from '@photon/schema'

export const DetailsControls = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const idAlbum = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum

    const [albumQuery] = useQAlbum({
        variables: {
            id: idAlbum
        },
        pause: !router.isReady
    })

    const details = useDetailsContext()
    const selection = useSelectionContext()
    const layout = useLayoutContext()

    const [moreActive, setMoreActive] = useState(false)

    const select = () => {
        selection.toggle(details.medium)
    }

    const toggleDropdown = () => {
        setMoreActive(!moreActive)
    }

    useKeyboard('keyup', ' ', selection.selected.size > 0 ? select : undefined)

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
        <DeleteControl
            dropdown={true}
            shortcut={true}
            elements={[details.medium]}
            callback={toggleDropdown}
            key={0}
        />,
        <RotateControl
            dropdown={true}
            shortcut={true}
            media={[details.medium]}
            callback={toggleDropdown}
            key={1}
        />,
        <ArchiveControl
            dropdown={true}
            shortcut={true}
            media={[details.medium]}
            callback={toggleDropdown}
            key={2}
        />
    ]

    if (idAlbum) {
        moreItems.push(<SetAlbumCoverControl
            dropdown={true}
            shortcut={true}
            album={albumQuery.data?.album}
            medium={details.medium}
            callback={toggleDropdown}
        />)
    }

    const RegularActions = () => {
        return <>
            <DownloadControl
                elements={[details.medium]}
                shortcut={true}
            />
            <FavoriteControl
                media={[details.medium]}
                shortcut={true}
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
                    onClick={toggleDropdown}
                />
            </Dropdown>
        </>
    }

    const Actions = () => {
        if (router.pathname === '/trash') {
            return <TrashControls white={true} />
        }
        else {
            return <RegularActions />
        }
    }

    return <>
        <Actions />
    </>
}
