import { TeaserProvider } from './TeaserContext'
import TeaserComponent from './Teaser'
import { TVideoMeta } from '@photon/schema'
import { useRouter } from 'next/router'
import { useDetailsContext } from '@/providers'
import { TeaserFavoredByControl } from '@/components/Teaser/TeaserFavoredByControl'
import { TeaserOpenFallbackControl } from '@/components/Teaser/TeaserOpenFallbackControl'
import { TeaserNavControl } from '@/components/Teaser/TeaserNavControl'
import { TeaserDurationControl } from '@/components/Teaser/TeaserDurationControl'
import { TeaserContent } from '@/components/Teaser/TeaserContent'
import { TCover } from '@/components'

type Props = {
    displayWidth?: number
    displayHeight?: number
    id: string
    cover?: TCover | null
    favoredBy?: number
    title?: string
    href: string
    stack?: string[]
    album?: boolean
}

export const Teaser = ({
    id, cover, favoredBy, title, href, displayWidth, displayHeight, stack, album = false
}: Props) => {
    const router = useRouter()
    const details = useDetailsContext()

    return id ? <TeaserProvider
        id={id}
        draggable={!album}
        selectable={true}
        onOpen={() => {
            if (album) {
                router.push(`albums/${id}`)
            }
            else {
                details.open(id)
            }
        }}
        href={href}
        cover={cover}
        displayWidth={displayWidth}
        displayHeight={displayHeight}
        nativeWidth={cover ? cover.meta.width : undefined}
        nativeHeight={cover ? cover.meta.height : undefined}
        bottomLeftControls={favoredBy > 0 ? <TeaserFavoredByControl count={favoredBy} /> : null}
        bottomRightControls={!album ? <TeaserOpenFallbackControl /> : undefined}
        topRightControls={cover?.mimetype === 'video' ? <TeaserDurationControl duration={(cover.meta as TVideoMeta).duration} /> : <TeaserNavControl stack={stack} />}
        content={title ? <TeaserContent
            title={title}
        /> : undefined}
    >
        <TeaserComponent />
    </TeaserProvider> : null
}
