
import { useContext } from 'react'
import { MediaContext } from '@/providers'

export const GalleryView = () => {
    const media = useContext(MediaContext)

    return <div className="gallery">
        <div className="gallery__sections">
            {media.sections}
        </div>
    </div>
}
