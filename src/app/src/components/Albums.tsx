import { TAlbum } from '@/api'
import { AlbumTeaser } from '@/components'

type Props = {
    albums: Partial<TAlbum>[]
}

export const Albums = ({ albums }: Props) => {
    const albumElements = albums.map((album, k) => <AlbumTeaser
        album={album}
        key={k}
    />)

    return <div className="albums">
        <div className="albums__items">
            {albumElements}
        </div>
    </div>
}
