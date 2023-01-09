import { TAlbum } from '../api'
import { AlbumTeaser } from './index'

type Props = {
    albums: Partial<TAlbum>[]
}

export const Albums = ({ albums }: Props) => {
    const albumElements = albums.map((album, k) => <AlbumTeaser
        album={album}
        key={k}
    />)

    console.log(albums)
    return <div className="albums">
        <div className="albums__items">
            {albumElements}
        </div>
    </div>
}
