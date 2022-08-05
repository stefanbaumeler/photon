import { ReactNode } from 'react'
import { Sidebar } from '@/components'

type Props = {
    children?: ReactNode
}

const Layout = ({ children }: Props) => {
    return <>
        <div id="modal-root"></div>
        <div id="content-root">
            <Sidebar />
            <main className="flex flex-col flex-1 pt-12 bg-gray-100 items-center px-10">
                {children}
            </main>
        </div>
    </>
}

export default Layout
