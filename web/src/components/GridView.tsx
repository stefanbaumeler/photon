import { Teaser } from '@/components'
import { TQAlbums, TQMedia } from '@photon/schema'

type Props = {
    elements: TQMedia['media'] | TQAlbums['albums']
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
