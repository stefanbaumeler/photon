import { Teaser } from '@/components'
import { TAlbum, TMedium } from '@photon/schema'

type Props = {
    elements: (TMedium | TAlbum)[]
}

export const GridView = ({ elements }: Props) => {
    const items = elements.map((element, key) => {
        return <Teaser
            key={key}
            element={element}
        />
    })
    return <div className="grid-view">
        <div className="grid-view__items">
            {items}
        </div>
    </div>
}
