import { TMedium } from '@photon/schema'
import { Teaser } from '@/components'

type Props = {
    media: TMedium[]
}

export const FilmStrip = ({ media }: Props) => {
    const items = media.map((medium, k) => {
        return <Teaser
            element={medium}
            key={k}
        />
    })

    return <div className="film-strip">
        {items}
    </div>
}
