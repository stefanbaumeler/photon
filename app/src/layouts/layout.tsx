import { ReactNode } from 'react'
import { Sidebar, SearchBar } from '@/components'

type Props = {
    children?: ReactNode
}

const Layout = ({ children }: Props) => {
    return <>
        <div id="modal-root"></div>
        <div
            id="content-root"
            className="root"
        >
            <SearchBar />
            <Sidebar />
            <main className="main">
                {children}
            </main>
        </div>
    </>
}

export default Layout
