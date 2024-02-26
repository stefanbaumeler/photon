import { TMedium } from '@photon/schema'
import { ESelectionMode } from '@/types/app'
import { Check, Teaser } from '@/components'
import { useEffect, useMemo, useState } from 'react'
import { generateGallery } from '@/util/gallery'
import { useSelectionContext } from '@/providers'
import bem from '@/util/bem'
import { useGalleryContext } from './GalleryContext'

type Props = {
    media: TMedium[]
    title: string
    targetRowHeight?: number
    containerWidth?: number
}

export const GallerySection = ({
    media, title
}: Props) => {
    const gallery = useGalleryContext()
    const [containerWidth, setContainerWidth] = useState(gallery.containerWidth || window.innerWidth - 272)

    const selection = useSelectionContext()

    const teasers = useMemo(() => {
        // const trh = gallery.targetRowHeight || (window.innerWidth < 1024 ? 225 : 200)
        const trh = window.innerWidth < 1024 ? 225 : 200
        const maxHeight = window.innerWidth < 1024 ? 355 : 250

        const dimensions = generateGallery({
            containerWidth,
            images: media,
            targetRowHeight: trh,
            margin: 2,
            maxHeight
        })

        return media.map((medium, k) => <Teaser
            element={medium}
            displayWidth={dimensions[k].width}
            displayHeight={dimensions[k].height}
            key={k}
        />)
    }, [containerWidth, media])

    const resize = () => {
        setContainerWidth(gallery.containerWidth || window.innerWidth - 272)
    }

    useEffect(() => {
        window.addEventListener('resize', resize)

        return () => window.removeEventListener('resize', resize)
    })

    const select = () => {
        if (selection.mode === ESelectionMode.OFF) {
            selection.setMode(ESelectionMode.SELECT)
        }

        selection.toggle(media.map((medium) => medium.id))
    }

    const classes = bem('gallery-section', [
        ['one', media.length === 1]
    ])

    const headerClasses = bem('gallery-section__header', [
        ['selecting', selection.mode !== ESelectionMode.OFF]
    ])

    return <div
        data-testid="gallery-section"
        className={classes}
    >
        <div className={headerClasses}>
            <div className="gallery-section__check">
                <Check
                    testId="gallery-section-check"
                    backgroundColor="#F0F0F0"
                    onClick={select}
                    ready={false}
                    checked={selection.isSelected(media.map((medium) => medium.id))}
                    remove={selection.mode === ESelectionMode.DELETE}
                />
            </div>
            <span className="gallery-section__title">
                {title}
            </span>
        </div>
        <div className="gallery-section__container">
            {teasers}
        </div>
    </div>
}
