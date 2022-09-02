import { TMedia } from '@/types/api'
import { GalleryItem } from '@/types/app'
import { Medium } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { generateGallery } from '@/util/gallery'

type Props = {
    media: TMedia[]
}

const MediaSection = ({ media }: Props) => {
    const galleryEl = useRef(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [images, setImages] = useState<GalleryItem[]>([])

    useEffect(() => {
        setImages(media
            .map((medium) => ({
                medium,
                ratio: medium.height > medium.width ? 1 / (medium.height / medium.width) : medium.width / medium.height
            }))
        )
    }, [media])

    useEffect(() => {
        let animationFrameID: number = null

        const observer = new ResizeObserver((entries) => {
            const newWidth = entries[0].contentRect.width

            if (containerWidth !== newWidth) {
                animationFrameID = window.requestAnimationFrame(() => {
                    setContainerWidth(Math.floor(newWidth))
                })
            }
        })

        observer.observe(galleryEl.current)

        return () => {
            observer.disconnect()
            window.cancelAnimationFrame(animationFrameID)
        }
    })

    generateGallery({
        containerWidth,
        images,
        targetRowHeight: 300,
        margin: 2
    })

    return <div
        className="media-section"
        ref={galleryEl}
    >
        <div
            className="media-section__container"
            style={{
                width: containerWidth || 'auto'
            }}
        >
            {images.map((galleryItem, k) => <Medium
                collection={media}
                medium={galleryItem.medium}
                width={galleryItem.width}
                height={galleryItem.height}
                key={k}
            />)}
        </div>
    </div>
}

export default MediaSection
