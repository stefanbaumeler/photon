import { Uploader } from '@/components/shared/Uploader'
import { Media } from '@/components/shared/Media'
import { Suspense } from 'react'
import { SearchBar } from '@/components/shared/SearchBar'

const GalleryPage = async () => {
    return <>
        <Uploader />
        <SearchBar />
        <main className="main">
            <Suspense fallback={<p>
                Loading...
            </p>}
            >
                <Media />
            </Suspense>
        </main>
    </>
}

export default GalleryPage
