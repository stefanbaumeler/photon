import { GalleryProvider, VisualGalleryView } from '.'
import { TMedium } from '@photon/schema'

type Props = {
    containerWidth?: number
    targetRowHeight?: number
    elements: TMedium[]
}

export const GalleryView = ({
    containerWidth, targetRowHeight, elements
}: Props) => {
    return <GalleryProvider
        containerWidth={containerWidth}
        targetRowHeight={targetRowHeight}
    >
        <VisualGalleryView elements={elements} />
    </GalleryProvider>
}
