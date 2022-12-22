import { ReactNode, useContext } from 'react'
import { Scrollbar, SearchBar, Sidebar } from '@/components'
import { SelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import bem from '@/util/bem'

type Props = {
    children?: ReactNode
}

const Layout = ({ children }: Props) => {
    const selection = useContext(SelectionContext)

    const classes = bem('root', [
        ['selecting', selection.mode !== ESelectionMode.OFF]
    ])

    return <>
        <div id="modal-root"></div>
        <div
            id="content-root"
            className={classes}
        >
            <SearchBar />
            <Sidebar />
            <main
                className="main"
            >
                {children}
            </main>
            <Scrollbar />
        </div>
    </>
}

export default Layout
