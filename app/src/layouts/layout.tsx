import { ReactNode, useContext } from 'react'
import { Sidebar, SearchBar } from '@/components'
import { SelectionContext } from '@/providers'

type Props = {
    children?: ReactNode
}

const Layout = ({ children }: Props) => {
    const selection = useContext(SelectionContext)

    return <>
        <div id="modal-root"></div>
        <div
            id="content-root"
            className={`root${selection.isInSelectionMode ? ' root--selecting' : ''}`}
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
