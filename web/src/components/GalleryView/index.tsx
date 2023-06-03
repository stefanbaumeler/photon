import { GalleryProvider } from './GalleryContext'
import { GalleryView as GV } from './GalleryView'
import { TMedium } from '@photon/schema'

type Props = {
    media: TMedium[]
    containerWidth?: number
    targetRowHeight?: number
}

export const GalleryView = ({
    media, containerWidth, targetRowHeight
}: Props) => {
    return <GalleryProvider
        media={media}
        containerWidth={containerWidth}
        targetRowHeight={targetRowHeight}
    >
        <GV />
    </GalleryProvider>
}
