import { TMedium } from '@/types/api'
import { ESelectionMode, GalleryItem } from '@/types/app'
import { Check, Medium } from '@/components'
import { useContext, useEffect, useRef, useState } from 'react'
import { generateGallery } from '@/util/gallery'
import { SelectionContext } from '@/providers'

type Props = {
    media: TMedium[]
    title: string
    collection: TMedium[]
}

const MediaSection = ({
    media, title, collection
}: Props) => {
    const galleryEl = useRef(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [images, setImages] = useState<GalleryItem[]>([])

    const selection = useContext(SelectionContext)

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
        margin: 2,
        maxHeight: 400
    })

    const select = () => {
        if (selection.mode === ESelectionMode.OFF) {
            selection.setMode(ESelectionMode.SELECT)
        }

        selection.toggle(media)
    }

    const classes = ['media-section']

    if (media.length === 1) {
        classes.push('media-section--one')
    }

    if (media.map((medium) => medium.id).includes(selection.lastAdded?.id)) {
        classes.push('media-section--has-last')
    }

    return <div
        className={classes.join(' ')}
        ref={galleryEl}
    >
        <div className={`media-section__header${selection.mode === ESelectionMode.OFF ? '' : ' media-section__header--selecting'}`}>
            <div className="media-section__check">
                <Check
                    dark={true}
                    onClick={select}
                    checked={selection.isSelected(media)}
                    remove={selection.mode === ESelectionMode.DELETE}
                />
            </div>
            <span className="media-section__title">
                {title}
            </span>
        </div>
        <div className="media-section__container">
            {images.map((galleryItem, k) => <Medium
                collection={collection}
                medium={galleryItem.medium}
                width={galleryItem.width}
                height={galleryItem.height}
                key={k}
            />)}
        </div>
    </div>
}

export default MediaSection
