import { usePathname } from 'next/navigation'
import bem from '@/util/bem'
import { EmptyTrashControl } from '@/components/controls/EmptyTrashControl'
import { UploadControl } from '@/components/controls/UploadControl'
import { SortControl } from '@/components/controls/SortControl'
import { ViewControl } from '@/components/controls/ViewControl'
import { SignOutControl } from '@/components/controls/SignOutControl'

export const DefaultControls = () => {
    const pathname = usePathname()

    const classes = bem('actions', [
        ['labeled', pathname === '/trash']
    ])

    return <div
        className={classes}
        data-testid="actions"
    >
        {pathname === '/trash' ? <EmptyTrashControl /> : <UploadControl shortcut />}
        <SortControl />
        <ViewControl />
        <SignOutControl />
    </div>
}
