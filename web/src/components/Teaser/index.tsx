import { TeaserProvider } from './TeaserContext'
import TeaserComponent from './Teaser'
import { TAlbum, TMedium, TVideoMeta } from '@photon/schema'
import { useRouter } from 'next/router'
import { useDetailsContext } from '@/providers'
import { TeaserFavoredByControl } from '@/components/Teaser/TeaserFavoredByControl'
import { TeaserOpenFallbackControl } from '@/components/Teaser/TeaserOpenFallbackControl'
import { TeaserNavControl } from '@/components/Teaser/TeaserNavControl'
import { TeaserDurationControl } from '@/components/Teaser/TeaserDurationControl'
import { TeaserContent } from '@/components/Teaser/TeaserContent'

type Props = {
    element: TMedium | TAlbum
    displayWidth?: number
    displayHeight?: number
}

export const Teaser = ({
    element, displayWidth, displayHeight
}: Props) => {
    const router = useRouter()
    const details = useDetailsContext()

    if (!element) {
        return <></>
    }

    const isMedium = element.__typename === 'Medium'
    const cover = isMedium ? element : element.cover
    const href = isMedium ? details.getUrl(element.id) : `albums/${element.id}`

    let topRightControls

    if (isMedium) {
        if (element.mimetype === 'video') {
            topRightControls = <TeaserDurationControl duration={(element.meta as TVideoMeta).duration} />
        }
    }
    else {
        topRightControls = <TeaserNavControl />
    }

    return <TeaserProvider
        id={element.id}
        draggable={isMedium}
        selectable={true}
        onOpen={() => {
            if (isMedium) {
                details.open(element.id)
            } else {
                router.push(`albums/${element.id}`)
            }
        }}
        href={href}
        cover={cover}
        displayWidth={displayWidth}
        displayHeight={displayHeight}
        nativeWidth={cover ? cover.meta.width : undefined}
        nativeHeight={cover ? cover.meta.height : undefined}
        bottomLeftControls={isMedium ? <TeaserFavoredByControl count={element.favoredBy.length} /> : undefined}
        bottomRightControls={isMedium ? <TeaserOpenFallbackControl /> : undefined}
        topRightControls={topRightControls}
        content={isMedium ? undefined : <TeaserContent
            title={element.title}
        />}
    >
        <TeaserComponent />
    </TeaserProvider>
}
