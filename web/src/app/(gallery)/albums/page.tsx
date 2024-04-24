import { Albums } from '@/components/shared/Albums'
import { Uploader } from '@/components/shared/Uploader'
import { SearchProvider } from '@/providers/SearchProvider'
import { SearchBar } from '@/components/shared/SearchBar'

const AlbumsPage = () => {
    return <SearchProvider>
        <Uploader />
        <SearchBar />
        <main className="main">
            <Albums />
        </main>

    </SearchProvider>
}

export default AlbumsPage
