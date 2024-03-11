import { Teaser } from '@/components'
import { useDetailsContext } from '@/providers'
import { TFilmStripItem } from '@/types/app'

type Props = {
    media: TFilmStripItem[]
}

export const FilmStrip = ({ media }: Props) => {
    const details = useDetailsContext()

    const items = media.map((medium, k) => {
        return <Teaser
            id={medium.id}
            cover={medium.cover}
            favoredBy={medium.favoredBy}
            href={details.getUrl(medium.id)}
            key={k}
        />
    })

    return <div className="film-strip">
        {items}
    </div>
}
