import { TeaserProvider } from './TeaserContext'
import TeaserComponent from './Teaser'
import { TQAlbums, TQMedia } from '@photon/schema'

type Props = {
    element: TQMedia['media'][number] | TQAlbums['albums'][number]
    width?: number
    height?: number
}

export const Teaser = ({
    element, width, height
}: Props) => {
    if (!element) {
        return <></>
    }

    return <TeaserProvider
        element={element}
        width={width}
        height={height}
    >
        <TeaserComponent />
    </TeaserProvider>
}
