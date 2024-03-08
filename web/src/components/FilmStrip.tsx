import { TCover, Teaser } from '@/components'
import { useDetailsContext } from '@/providers'

type TFilmStripItem = {
    id: string
    cover: TCover | null
    favoredBy: number
}

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
