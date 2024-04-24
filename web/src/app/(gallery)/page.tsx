import GalleryPage from '@/GalleryPage'
import { SearchProvider } from '@/providers/SearchProvider'

const OverviewPage = () => {
    return <SearchProvider>
        <GalleryPage />
    </SearchProvider>
}

export default OverviewPage
