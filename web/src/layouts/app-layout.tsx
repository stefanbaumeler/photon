import { ReactNode } from 'react'
import { EMediumStatus } from '@/types/app'
import { SearchProvider } from '@/providers/SearchProvider'
import { FocusOverlay } from '@/components/shared/FocusOverlay'
import { SearchBar } from '@/components/shared/SearchBar'
import { Sidebar } from '@/components/shared/Sidebar'

type Props = {
    children?: ReactNode
    status?: EMediumStatus
    favorites?: boolean
}

const AppLayout = ({
    children, status, favorites
}: Props) => {
    return <SearchProvider
        status={status}
        favorites={favorites}
    >
        <FocusOverlay />
        <SearchBar />
        <Sidebar />
        <main className="main">
            {children}
        </main>
    </SearchProvider>
}

export default AppLayout
