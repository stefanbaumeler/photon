import { SearchProvider } from '@/providers/SearchProvider'
import GalleryPage from '@/GalleryPage'

const FavoritesPage = () => {
    return <SearchProvider
        favorites
    >
        <GalleryPage />
    </SearchProvider>
}

export default FavoritesPage
