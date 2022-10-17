import { TMedium } from '@/types/api'
import { ESelectionMode, GalleryItem } from '@/types/app'
import { Check, Medium } from '@/components'
import { useContext, useEffect, useRef, useState } from 'react'
import { generateGallery } from '@/util/gallery'
import { SelectionContext } from '@/providers'
import bem from '@/util/bem'

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

    const resize = () => {
        const newWidth = galleryEl.current?.clientWidth

        if (containerWidth !== newWidth) {
            setContainerWidth(Math.floor(newWidth))
        }
    }

    useEffect(() => {
        resize()
    }, [images])

    useEffect(() => {
        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
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

    const classes = bem('media-section', [
        ['one', media.length === 1]
    ])

    const headerClasses = bem('media-section__header', [
        ['selecting', selection.mode !== ESelectionMode.OFF]
    ])

    return <div
        className={classes}
        ref={galleryEl}
    >
        <div className={headerClasses}>
            <div className="media-section__check">
                <Check
                    dark={true}
                    onClick={select}
                    ready={false}
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
