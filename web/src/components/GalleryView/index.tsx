import { GalleryProvider } from './GalleryContext'
import { GalleryView as GV } from './GalleryView'

type Props = {
    containerWidth?: number
    targetRowHeight?: number
}

export const GalleryView = ({
    containerWidth, targetRowHeight
}: Props) => {
    return <GalleryProvider
        containerWidth={containerWidth}
        targetRowHeight={targetRowHeight}
    >
        <GV />
    </GalleryProvider>
}
