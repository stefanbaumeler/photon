import { ReactNode } from 'react'
import { SearchBar, Sidebar, FocusOverlay, Details, VerifyAccountMessage } from '@/components'
import { useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import bem from '../util/bem'
import AuthGuard from '@/api/AuthGuard'

type Props = {
    children?: ReactNode
}

const AppLayout = ({ children }: Props) => {
    const selection = useSelectionContext()

    const classes = bem('root', [
        ['selecting', selection.mode !== ESelectionMode.OFF]
    ])

    return <AuthGuard>
        <div
            id="root"
        >
            <div id="modal-root"></div>
            <VerifyAccountMessage />
            <div
                id="app-root"
                data-testid="content-root"
                className={classes}
            >
                <FocusOverlay />
                <SearchBar />
                <Sidebar />
                <Details />
                <main className="main">
                    {children}
                </main>
            </div>
        </div>
    </AuthGuard>
}

export default AppLayout
