import { useMediaContext } from '@/providers'

export const GalleryView = () => {
    const media = useMediaContext()

    return <div className="gallery">
        <div className="gallery__sections">
            {media.sections}
        </div>
    </div>
}
