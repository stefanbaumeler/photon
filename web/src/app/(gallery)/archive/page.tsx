import { SearchProvider } from '@/providers/SearchProvider'
import GalleryPage from '@/GalleryPage'
import { EMediumStatus } from '@/types/app'

const ArchivePage = () => {
    return <SearchProvider
        status={EMediumStatus.ARCHIVED}
    >
        <GalleryPage />
    </SearchProvider>
}

export default ArchivePage
