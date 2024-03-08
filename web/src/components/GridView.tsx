import { Teaser } from '@/components'
import { TMedium, TMeta } from '@photon/schema'

export type TCover = Pick<TMedium, 'filenameDisk' | 'mimetype'> & { meta: Pick<TMeta, 'width' | 'height'> } | null

export type TGridItem = {
    id: string
    href: string
    favoredBy?: number
    cover: TCover | null
    title: string
    stack: string[]
}

type Props = {
    albums: boolean
    elements: TGridItem[]
}

export const GridView = ({
    elements, albums
}: Props) => {
    const items = elements.map((element, key) => {
        return <Teaser
            album={albums}
            id={element.id}
            favoredBy={element.favoredBy}
            href={element.href}
            cover={element.cover}
            title={element.title}
            key={key}
            stack={element.stack}
        />
    })
    return <div className="grid-view">
        <div className="grid-view__items">
            {items}
        </div>
    </div>
}
