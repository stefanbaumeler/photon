import * as Icons from '@mdi/js'
import { IconButton } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useContext, useRef } from 'react'
import { LayoutContext, NavContext, SelectionContext } from '@/providers'
import { ENavItemType, ESelectionMode } from '@/types/app'
import useUpload from '@/hooks/upload'
import { useRouter } from 'next/router'
import bem from '@/util/bem'
import useEmptyTrashDialog from '@/dialogs/empty-trash'

const DefaultActions = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const nav = useContext(NavContext)
    const selection = useContext(SelectionContext)

    const emptyTrashDialog = useEmptyTrashDialog()

    const uploadRef = useRef<HTMLInputElement>(null)

    const item = nav.getActiveItem()

    const clickUpload = () => {
        uploadRef.current.click()
    }

    const upload = useUpload()

    const layout = useContext(LayoutContext)

    const layoutProps = layout.getLayoutProps(layout.nextLayout)

    const changeLayout = () => {
        layout.setLayout(layout.nextLayout)
    }

    if (item.type === ENavItemType.ALBUMS || selection.mode !== ESelectionMode.OFF || nav.pathname === '/albums/[idAlbum]') {
        return <></>
    }

    const RegularActions = () => {
        return <>
            <IconButton
                hint={layoutProps.name}
                icon={layoutProps.icon}
                onClick={changeLayout}
            />
            <input
                data-cy="upload-action"
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
        </>
    }

    const TrashActions = () => {
        return <>
            <IconButton
                label={t(ETrans.EMPTY_TRASH)}
                icon={Icons.mdiDeleteForever}
                onClick={emptyTrashDialog}
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

export default DefaultActions
