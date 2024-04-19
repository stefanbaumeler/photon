import { GalleryProvider, VisualGalleryView } from '.'
import { TMedium } from '@photon/schema'

type Props = {
    containerWidth?: number
    elements: TMedium[]
}

export const GalleryView = ({
    containerWidth, elements
}: Props) => {
    return <GalleryProvider
        containerWidth={containerWidth}
    >
        <VisualGalleryView elements={elements} />
    </GalleryProvider>
}
