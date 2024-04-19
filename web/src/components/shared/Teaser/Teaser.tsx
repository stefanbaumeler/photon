import { TVideoMeta } from '@photon/schema'
import { useRouter } from 'next/router'
import { useDetailsContext } from '@/providers'
import { VisualTeaser, TeaserProvider, TeaserFavoredByControl, TeaserOpenFallbackControl, TeaserNavControl, TeaserDurationControl, TeaserContent } from '.'
import { TCover } from '@/types/app'

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
    const router = useRouter()
    const details = useDetailsContext()

    return id ? <TeaserProvider
        id={id}
        draggable={!album}
        selectable
        onOpen={() => {
            if (album) {
                router.push(`albums/${id}`)
            }
            else if (cover) {
                details.open({
                    ...cover,
                    id
                })
            }
        }}
        href={href}
        cover={cover}
        displayWidth={displayWidth}
        displayHeight={displayHeight}
        nativeWidth={cover ? cover.meta.width : 0}
        nativeHeight={cover ? cover.meta.height : 0}
        bottomLeftControls={favoredBy > 0 ? <TeaserFavoredByControl count={favoredBy} /> : null}
        bottomRightControls={!album ? <TeaserOpenFallbackControl /> : undefined}
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
