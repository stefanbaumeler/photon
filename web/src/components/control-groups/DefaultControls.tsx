import { useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import { useRouter } from 'next/router'
import bem from '@/util/bem'
import { UploadControl, SignOutControl, EmptyTrashControl, ViewControl, SortControl } from '@/components/controls'

export const DefaultControls = () => {
    const router = useRouter()
    const selection = useSelectionContext()

    const inactive = router.pathname === '/albums' || selection.mode !== ESelectionMode.OFF || router.pathname === '/albums/[idAlbum]'

    if (inactive) {
        return <></>
    }

    const Actions = () => {
        if (router.pathname === '/trash') {
            return <EmptyTrashControl />
        }
        else {
            return <UploadControl shortcut={true} />
        }
    }

    const classes = bem('actions', [
        ['labeled', router.pathname === '/trash']
    ])

    return <div className={classes}>
        <Actions />
        <SortControl />
        <ViewControl />
        <SignOutControl />
    </div>
}
