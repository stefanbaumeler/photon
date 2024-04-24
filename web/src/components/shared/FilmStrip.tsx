import { TFilmStripItem } from '@/types/app'
import { Teaser } from '@/components/shared/Teaser'
import { getDetailsUrl } from '@/util/routing'
import { usePathname } from 'next/navigation'

type Props = {
    media: TFilmStripItem[]
}

export const FilmStrip = ({ media }: Props) => {
    const pathname = usePathname()

    const items = media.map((medium, k) => {
        return <Teaser
            id={medium.id}
            cover={medium.cover}
            favoredBy={medium.favoredBy}
            href={getDetailsUrl(pathname, medium.id)}
            key={k}
        />
    })

    return <div className="film-strip">
        {items}
    </div>
}
