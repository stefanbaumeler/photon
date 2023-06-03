import { TeaserProvider } from './TeaserContext'
import TeaserComponent from './Teaser'
import { TAlbum, TMedium } from '@photon/schema'

type Props = {
    element: TMedium | TAlbum
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
