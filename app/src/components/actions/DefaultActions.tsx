import * as Icons from '@mdi/js'
import { Dropdown, IconButton } from '../index'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useRef, useState } from 'react'
import { useLayoutContext, useNavContext, useSelectionContext, useMediaContext } from '@/providers'
import { EMediumSort, ENavItemType, ESelectionMode } from '@/types/app'
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
    const media = useMediaContext()

    const emptyTrashDialog = useEmptyTrashDialog()

    const uploadRef = useRef<HTMLInputElement>(null)

    const [moreActive, setMoreActive] = useState(false)

    const item = nav.getActiveItem()

    const clickUpload = () => {
        uploadRef.current.click()
    }

    const upload = useUpload()

    const layout = useLayoutContext()

    const layoutProps = layout.getLayoutProps(layout.nextLayout)

    const changeLayout = () => {
        layout.setLayout(layout.nextLayout)
    }

    const [out] = useMSignOut()

    const signOut = () => {
        out().then(() => {
            router.push('/login')
        })
    }

    if (item.type === ENavItemType.ALBUMS || selection.mode !== ESelectionMode.OFF || nav.pathname === '/albums/[idAlbum]') {
        return <></>
    }

    const moreItems = [
        {
            label: t(ETrans.NEWEST_FIRST),
            callback: () => media.setSort(EMediumSort.NEWEST)
        },
        {
            label: t(ETrans.OLDEST_FIRST),
            callback: () => media.setSort(EMediumSort.OLDEST)
        },
        {
            label: t(ETrans.MOST_RECENT),
            callback: () => media.setSort(EMediumSort.RECENT)
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
                items={moreItems}
                active={moreActive}
                onClickOutside={() => setMoreActive(false)}
            >
                <IconButton
                    hint={t(ETrans.SORT)}
                    icon={Icons.mdiSwapVertical}
                    onClick={() => setMoreActive(!moreActive)}
                />
            </Dropdown>
            <IconButton
                hint={layoutProps.name}
                icon={layoutProps.icon}
                onClick={changeLayout}
            />
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
            <IconButton
                hint={layoutProps.name}
                icon={layoutProps.icon}
                onClick={changeLayout}
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

    const classes = bem('actions', [
        ['labeled', router.pathname === '/trash']
    ])

    return <div className={classes}>
        <Actions />
    </div>
}
