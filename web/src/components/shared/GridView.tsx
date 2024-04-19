import { Teaser } from '@/components'
import { TGridItem } from '@/types/app'

type Props = {
    albums?: boolean
    elements: TGridItem[]
}

export const GridView = ({
    elements, albums = false
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
