import { ReactNode } from 'react'
import { SearchBar, Sidebar } from '@/components'
import { useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
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
