import { TMedium } from '@photon/shared'
import { ESelectionMode, GalleryItem } from '@/types/app'
import { Check, Teaser } from '@/components'
import { useContext, useEffect, useRef, useState } from 'react'
import { generateGallery } from '@/util/gallery'
import { SelectionContext } from '@/providers'
import bem from '@/util/bem'

type Props = {
    media: TMedium[]
    title: string
}

const GallerySection = ({
    media, title
}: Props) => {
    const galleryEl = useRef(null)
    const [windowWidth, setWindowWidth] = useState(0)
    const [elements, setElements] = useState<GalleryItem[]>([])
    const [adjustedElements, setAdjustedElements] = useState<GalleryItem[]>([])

    const selection = useContext(SelectionContext)

    useEffect(() => {
        setElements(media
            .filter((medium) => selection.mode !== ESelectionMode.DELETE || !selection.selected.has(medium))
            .map((medium) => ({
                medium,
                ratio: medium.meta.height > medium.meta.width ? 1 / (medium.meta.height / medium.meta.width) : medium.meta.width / medium.meta.height,
                width: 0,
                height: 0
            }))
        )
    }, [media, selection.selected])

    const resize = () => {
        if (!galleryEl.current) {return}

        const maxHeight = window.innerWidth < 1024 ? 400 : 500
        const targetRowHeight = window.innerWidth < 1024 ? 300 : 250
        setWindowWidth(window.innerWidth)

        generateGallery({
            containerWidth: window.innerWidth - 300,
            images: elements,
            targetRowHeight,
            margin: 2,
            maxHeight
        }).then((res) => {
            setAdjustedElements(res)
        })
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            resize()
        })

        return () => window.removeEventListener('resize', () => {
            resize()
        })
    })

    useEffect(() => {
        resize()
    }, [elements])

    const select = () => {
        if (selection.mode === ESelectionMode.OFF) {
            selection.setMode(ESelectionMode.SELECT)
        }

        selection.toggle(media)
    }

    const classes = bem('gallery-section', [
        ['one', media.length === 1]
    ])

    const headerClasses = bem('gallery-section__header', [
        ['selecting', selection.mode !== ESelectionMode.OFF]
    ])

    if (!elements.length) {
        return <></>
    }

    return <div
        data-cy="gallery-section"
        className={classes}
        ref={galleryEl}
    >
        <div className={headerClasses}>
            <div className="gallery-section__check">
                <Check
                    cy="gallery-section-check"
                    backgroundColor="#F0F0F0"
                    onClick={select}
                    ready={false}
                    checked={selection.isSelected(media)}
                    remove={selection.mode === ESelectionMode.DELETE}
                />
            </div>
            <span className="gallery-section__title">
                {title}
            </span>
        </div>
        <div className="gallery-section__container">
            {adjustedElements.map((galleryItem, k) => <Teaser
                medium={galleryItem.medium}
                width={galleryItem.width}
                height={galleryItem.height}
                key={k}
            />)}
        </div>
    </div>
}

export default GallerySection
