import { TeaserProvider } from './TeaserContext'
import TeaserComponent from './Teaser'
import { TMedium } from '@/api'

type Props = {
    medium: TMedium
    width: number
    height: number
}

export const Teaser = ({
    medium, width, height
}: Props) => {
    if (!medium) {
        return <></>
    }
    return <TeaserProvider
        medium={medium}
        width={width}
        height={height}
    >
        <TeaserComponent />
    </TeaserProvider>
}
