import { SearchBar } from '@/components/shared/SearchBar'
import { SearchProvider } from '@/providers/SearchProvider'
import { ReactNode } from 'react'
import { FocusOverlay } from '@/components/shared/FocusOverlay'
import { Sidebar } from '@/components/shared/Sidebar'
import { Uploader } from '@/components/shared/Uploader'

type Props = {
    children: ReactNode
}

const SettingsLayout = ({ children }: Props) => {
    return <>
        <FocusOverlay />
        <Sidebar />
        <SearchProvider>
            <Uploader />
            <SearchBar />
            <main className="main">
                {children}
            </main>
        </SearchProvider>
    </>
}

export default SettingsLayout
