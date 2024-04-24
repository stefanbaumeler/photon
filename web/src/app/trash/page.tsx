import GalleryPage from '@/GalleryPage'
import { EMediumStatus } from '@/types/app'

const TrashPage = () => {
    return <GalleryPage status={EMediumStatus.TRASH} />
}

export default TrashPage
