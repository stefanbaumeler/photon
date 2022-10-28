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
    const [elements, setElements] = useState<GalleryItem[]>([])
    const [adjustedElements, setAdjustedElements] = useState<GalleryItem[]>([])

    const selection = useContext(SelectionContext)

    useEffect(() => {
        setElements(media
            .filter((medium) => selection.mode !== ESelectionMode.DELETE || !selection.selected.has(medium))
            .map((medium) => ({
                medium,
                ratio: medium.height > medium.width ? 1 / (medium.height / medium.width) : medium.width / medium.height,
                width: 0,
                height: 0
            }))
        )
    }, [media, selection.selected])

    const resize = () => {
        const newWidth = galleryEl.current?.offsetWidth

        if (containerWidth !== newWidth && typeof newWidth !== 'undefined') {
            setContainerWidth(Math.floor(newWidth))
        }
    }

    useEffect(() => {
        resize()
    }, [elements])

    useEffect(() => {
        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
        }
    })

    useEffect(() => {
        generateGallery({
            containerWidth: window.innerWidth - 300,
            images: elements,
            targetRowHeight: 300,
            margin: 2,
            maxHeight: 400
        }).then((res) => {
            setAdjustedElements(res)
        })
    }, [elements, window.innerWidth])

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

    if (!elements.length) {
        return <></>
    }

    return <div
        data-cy="media-section"
        className={classes}
        ref={galleryEl}
    >
        <div className={headerClasses}>
            <div className="media-section__check">
                <Check
                    cy="media-section-check"
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
            {adjustedElements.map((galleryItem, k) => <Medium
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
