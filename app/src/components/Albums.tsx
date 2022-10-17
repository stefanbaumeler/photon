import { TAlbum } from '@/types/api'
import { Album } from '@/components'

type Props = {
    albums: TAlbum[]
}

const Albums = ({ albums }: Props) => {
    const albumElements = albums.map((album, k) => <Album
        album={album}
        key={k}
    />)

    return <div className="albums">
        <div className="albums__items">
            {albumElements}
        </div>
    </div>
}

export default Albums
