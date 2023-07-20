import * as Icons from '@mdi/js'
import { Button, ViewControl, SortControl } from '../'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import useUpload from '../../hooks/upload'
import { useRouter } from 'next/router'
import bem from '../../util/bem'
import useEmptyTrashDialog from '../../dialogs/empty-trash'
import { useMSignOut } from '@photon/schema'

export const DefaultActions = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const selection = useSelectionContext()

    const emptyTrashDialog = useEmptyTrashDialog()

    const uploadRef = useRef<HTMLInputElement>(null)

    const clickUpload = () => {
        uploadRef.current.click()
    }

    const upload = useUpload()

    const [, out] = useMSignOut()

    const signOut = () => {
        out({}).then(() => {
            router.push('/login')
            window.localStorage.removeItem('photon')
        })
    }

    if (router.pathname === '/albums' || selection.mode !== ESelectionMode.OFF || router.pathname === '/albums/[idAlbum]') {
        return <></>
    }

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
            <Button
                hint={t(ETrans.UPLOAD)}
                icon={Icons.mdiTrayArrowUp}
                onClick={clickUpload}
            />
            <SortControl />
            <ViewControl />
            <Button
                hint={t(ETrans.SIGN_OUT)}
                icon={Icons.mdiLogout}
                onClick={signOut}
            />
        </>
    }

    const TrashActions = () => {
        return <>
            <Button
                label={t(ETrans.EMPTY_TRASH)}
                icon={Icons.mdiDeleteForever}
                onClick={emptyTrashDialog}
                testId="trash-empty"
                appearance={{
                    type: 'tertiary'
                }}
            />
            <ViewControl />
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
