import { TVideoMeta } from '@photon/schema/dist/client'
import { TCover } from '@/types/app'
import { TeaserProvider } from '@/components/shared/Teaser/components/TeaserContext'
import { TeaserFavoredByControl } from '@/components/shared/Teaser/components/TeaserFavoredByControl'
import { TeaserOpenFallbackControl } from '@/components/shared/Teaser/components/TeaserOpenFallbackControl'
import { TeaserDurationControl } from '@/components/shared/Teaser/components/TeaserDurationControl'
import { TeaserNavControl } from '@/components/shared/Teaser/components/TeaserNavControl'
import { TeaserContent } from '@/components/shared/Teaser/components/TeaserContent'
import { VisualTeaser } from '@/components/shared/Teaser/components/VisualTeaser'

type Props = {
    displayWidth?: number
    displayHeight?: number
    id: string
    cover: TCover | null
    favoredBy?: number
    title?: string
    href: string
    stack?: string[]
    album?: boolean
}

export const Teaser = ({
    id, cover, favoredBy = 0, title, href, displayWidth, displayHeight, stack, album = false
}: Props) => {
    return id ? <TeaserProvider
        id={id}
        draggable={!album}
        selectable
        href={href}
        cover={cover}
        displayWidth={displayWidth}
        displayHeight={displayHeight}
        nativeWidth={cover ? cover.meta.width : 0}
        nativeHeight={cover ? cover.meta.height : 0}
        bottomLeftControls={favoredBy > 0 ? <TeaserFavoredByControl count={favoredBy} /> : null}
        bottomRightControls={!album ? <TeaserOpenFallbackControl href={href} /> : undefined}
        topRightControls={cover?.mimetype === 'video' ? <TeaserDurationControl duration={(cover.meta as TVideoMeta).duration} /> : <TeaserNavControl
            stack={stack}
            album={album}
        />}
        content={title ? <TeaserContent
            title={title}
        /> : undefined}
    >
        <VisualTeaser />
    </TeaserProvider> : null
}
