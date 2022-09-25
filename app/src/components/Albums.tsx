import { useAlbums } from '@/api/hooks'
import { TAlbum } from '@/types/api'
import Link from 'next/link'

type Props = {
    albums: TAlbum[]
}

const Albums = ({ albums }: Props) => {
    const albumElements = albums.map((album, k) => <Link
        key={k}
        href={`albums/${album.id}`}
    >
        <span>
            Album:
            {' '}
            {album.id}
        </span>
    </Link>)

    return <>
        {albumElements}
    </>
}

export default Albums
