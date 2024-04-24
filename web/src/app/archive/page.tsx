import GalleryPage from '@/GalleryPage'
import { EMediumStatus } from '@/types/app'

const ArchivePage = () => {
    return <GalleryPage status={EMediumStatus.ARCHIVED} />
}

export default ArchivePage
