import { ReactNode } from 'react'
import { SearchBar, Sidebar, FocusOverlay } from 'web/src/components'
import { useSelectionContext } from 'web/src/providers'
import { ESelectionMode } from 'web/src/types/app'
import bem from '../util/bem'

type Props = {
    children?: ReactNode
}

const Layout = ({ children }: Props) => {
    const selection = useSelectionContext()

    const classes = bem('root', [
        ['selecting', selection.mode !== ESelectionMode.OFF]
    ])

    return <>
        <div id="modal-root"></div>
        <div
            id="content-root"
            data-testid="content-root"
            className={classes}
        >
            <FocusOverlay />
            <SearchBar />
            <Sidebar />
            <main
                className="main"
            >
                {children}
            </main>
        </div>
    </>
}

export default Layout
