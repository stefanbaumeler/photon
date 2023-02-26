import * as Icons from '@mdi/js'
import { Dropdown, IconButton } from '../index'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useRef, useState } from 'react'
import { useLayoutContext, useNavContext, useSelectionContext, useSortContext } from '@/providers'
import { ELayout, EMediumSort, ENavItemType, ESelectionMode } from '@/types/app'
import useUpload from '../../hooks/upload'
import { useRouter } from 'next/router'
import bem from '../../util/bem'
import useEmptyTrashDialog from '../../dialogs/empty-trash'
import { useMSignOut } from '@photon/schema'

export const DefaultActions = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const nav = useNavContext()
    const selection = useSelectionContext()
    const sort = useSortContext()

    const emptyTrashDialog = useEmptyTrashDialog()

    const uploadRef = useRef<HTMLInputElement>(null)

    const [sortDropdownActive, setSortDropdownActive] = useState(false)
    const [viewDropdownActive, setViewDropdownActive] = useState(false)

    const item = nav.getActiveItem()

    const clickUpload = () => {
        uploadRef.current.click()
    }

    const upload = useUpload()

    const layout = useLayoutContext()

    const layoutProps = layout.getLayoutProps(layout.nextLayout)

    const [out] = useMSignOut()

    const signOut = () => {
        out().then(() => {
            router.push('/login')
        })
    }

    if (item.type === ENavItemType.ALBUMS || selection.mode !== ESelectionMode.OFF || nav.pathname === '/albums/[idAlbum]') {
        return <></>
    }

    const sortItems = [
        {
            label: t(ETrans.NEWEST_FIRST),
            callback: () => sort.setSort(EMediumSort.NEWEST)
        },
        {
            label: t(ETrans.OLDEST_FIRST),
            callback: () => sort.setSort(EMediumSort.OLDEST)
        },
        {
            label: t(ETrans.MOST_RECENT),
            callback: () => sort.setSort(EMediumSort.RECENT)
        }
    ]

    const viewItems = [
        {
            label: t(ETrans.GALLERY_VIEW),
            callback: () => layout.setLayout(ELayout.GALLERY),
            icon: Icons.mdiViewCompact
        },
        {
            label: t(ETrans.MAP_VIEW),
            callback: () => layout.setLayout(ELayout.MAP),
            icon: Icons.mdiMapMarker
        },
        {
            label: t(ETrans.LIST_VIEW),
            callback: () => layout.setLayout(ELayout.LIST),
            icon: Icons.mdiFormatListBulletedSquare
        }
    ]

    const RegularActions = () => {
        return <>
            <input
                data-testid="upload"
                type="file"
                className="actions__uploader"
                ref={uploadRef}
                onChange={upload}
                multiple={true}
            />
            <IconButton
                hint={t(ETrans.UPLOAD)}
                icon={Icons.mdiTrayArrowUp}
                onClick={clickUpload}
            />
            <Dropdown
                items={sortItems}
                active={sortDropdownActive}
                onClickOutside={() => setSortDropdownActive(false)}
            >
                <IconButton
                    hint={t(ETrans.SORT)}
                    icon={Icons.mdiSwapVertical}
                    onClick={() => setSortDropdownActive(!sortDropdownActive)}
                />
            </Dropdown>
            <Dropdown
                items={viewItems}
                active={viewDropdownActive}
                onClickOutside={() => setViewDropdownActive(false)}
            >
                <IconButton
                    hint={t(ETrans.VIEW)}
                    icon={Icons.mdiEye}
                    onClick={() => setViewDropdownActive(!viewDropdownActive)}
                />
            </Dropdown>
            <IconButton
                hint={t(ETrans.SIGN_OUT)}
                icon={Icons.mdiLogout}
                onClick={signOut}
            />
        </>
    }

    const TrashActions = () => {
        return <>
            <IconButton
                label={t(ETrans.EMPTY_TRASH)}
                icon={Icons.mdiDeleteForever}
                onClick={emptyTrashDialog}
                testId="trash-empty"
            />
            <Dropdown
                items={viewItems}
                active={viewDropdownActive}
                onClickOutside={() => setViewDropdownActive(false)}
            >
                <IconButton
                    hint={t(ETrans.VIEW)}
                    icon={Icons.mdiEye}
                    onClick={() => setViewDropdownActive(!viewDropdownActive)}
                />
            </Dropdown>
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

    const classes = bem('actions', [
        ['labeled', router.pathname === '/trash']
    ])

    return <div className={classes}>
        <Actions />
    </div>
}
