import { TMedium } from '@photon/schema/dist/client'
import { ESelectionMode } from '@/types/app'
import { useEffect, useState } from 'react'
import { generateGallery } from '@/util/gallery'
import bem from '@/util/bem'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { Check } from '@/components/shared/Check'
import { Teaser } from '@/components/shared/Teaser'
import { getDetailsUrl } from '@/util/routing'
import { useParams, usePathname } from 'next/navigation'

type Props = {
    media: TMedium[]
    title: string
    targetRowHeight?: number
    containerWidth?: number
}

export const GallerySection = ({
    media, title
}: Props) => {
    const params = useParams()
    const album = Array.isArray(params.idAlbum) ? params.idAlbum[0] : params.idAlbum
    const [containerWidth, setContainerWidth] = useState(typeof window !== 'undefined' ? window.innerWidth - 272 : 0)
    const pathname = usePathname()

    const selection = useSelectionContext()

    const trh = window.innerWidth < 1024 ? 225 : 200
    const maxHeight = window.innerHeight < 1024 ? 355 : 250

    const dimensions = generateGallery({
        containerWidth,
        images: media,
        targetRowHeight: trh,
        margin: 2,
        maxHeight
    })

    const resize = () => {
        setContainerWidth(typeof window !== 'undefined' ? window.innerWidth - 272 : 0)
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

    if (!dimensions) {
        return null
    }

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
            {media.map((medium, k) => {
                return <Teaser
                    id={medium.id}
                    favoredBy={medium.favoredBy?.length}
                    href={getDetailsUrl(pathname, medium.id, album)}
                    cover={medium}
                    displayWidth={dimensions[k].width}
                    displayHeight={dimensions[k].height}
                    key={k}
                />
            })}
        </div>
    </div>
}
