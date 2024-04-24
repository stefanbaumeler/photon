import { Uploader } from '@/components/shared/Uploader'
import { Media } from '@/components/shared/Media'
import { AlbumDetails } from '@/components/shared/AlbumDetails'
import { Suspense } from 'react'
import { SearchProvider } from '@/providers/SearchProvider'
import { SearchBar } from '@/components/shared/SearchBar'

const AlbumPage = () => {
    return <SearchProvider>
        <Uploader />
        <SearchBar />
        <main className="main">
            <AlbumDetails />
            <Suspense>
                <Media />
            </Suspense>
        </main>
    </SearchProvider>
}

export default AlbumPage
