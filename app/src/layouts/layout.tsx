import { ReactNode, useContext } from 'react'
import { SearchBar, Sidebar } from '@/components'
import { SelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'

type Props = {
    children?: ReactNode
}

const Layout = ({ children }: Props) => {
    const selection = useContext(SelectionContext)

    return <>
        <div id="modal-root"></div>
        <div
            id="content-root"
            className={`root${selection.mode !== ESelectionMode.OFF ? ' root--selecting' : ''}`}
        >
            <SearchBar />
            <Sidebar />
            <main className="main">
                {children}
            </main>
            <div className="scrollbar"></div>
        </div>
    </>
}

export default Layout
