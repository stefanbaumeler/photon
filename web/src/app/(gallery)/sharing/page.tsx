import { SearchProvider } from '@/providers/SearchProvider'
import { SearchBar } from '@/components/shared/SearchBar'

const SharingPage = () => {
    return <SearchProvider>
        <SearchBar />
        <main className="main">
            sharing
        </main>
    </SearchProvider>
}

export default SharingPage
