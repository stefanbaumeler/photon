import { TMedium } from '@photon/schema'
import { Medium, Teaser } from '@/components'

type Props = {
    media: TMedium[]
}

export const FilmStrip = ({ media }: Props) => {
    const items = media.map((medium, k) => {
        return <Teaser
            medium={medium}
            key={k}
        />
    })

    return <div className="film-strip">
        {items}
    </div>
}
