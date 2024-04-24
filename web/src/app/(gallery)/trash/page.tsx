import GalleryPage from '@/GalleryPage'
import { EMediumStatus } from '@/types/app'
import { SearchProvider } from '@/providers/SearchProvider'

const TrashPage = () => {
    return <SearchProvider
        status={EMediumStatus.TRASH}
    >
        <GalleryPage />
    </SearchProvider>
}

export default TrashPage
