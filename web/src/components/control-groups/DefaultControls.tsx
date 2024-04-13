import { useRouter } from 'next/router'
import bem from '@/util/bem'
import { UploadControl, SignOutControl, EmptyTrashControl, ViewControl, SortControl } from '@/components/controls'

export const DefaultControls = () => {
    const router = useRouter()

    const classes = bem('actions', [
        ['labeled', router.pathname === '/trash']
    ])

    return <div
        className={classes}
        data-testid="actions"
    >
        {router.pathname === '/trash' ? <EmptyTrashControl /> : <UploadControl shortcut />}
        <SortControl />
        <ViewControl />
        <SignOutControl />
    </div>
}
