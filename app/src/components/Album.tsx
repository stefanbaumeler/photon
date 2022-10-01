import { TAlbum } from '@/types/api'
import Link from 'next/link'
import { useMedium } from '@/api/hooks/media'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { useAlbumMedia } from '@/api/hooks/albums'

type Props = {
    album: TAlbum
}

const Album = ({ album }: Props) => {
    const { t } = useTranslation()

    const media = useAlbumMedia({
        id: album.id
    })

    const medium = useMedium({
        id: `${album.idMedium}`
    })

    const AlbumImage = () => {
        if (!medium.state.filenameDisk) {
            return <></>
        }

        return <img
            className="album__image"
            src={`http://localhost:2000/uploads/${medium.state.filenameDisk}?w=800`}
            alt=""
        />
    }

    return <Link
        href={`albums/${album.id}`}
    >
        <a className="album">
            <div className="album__image-container">
                <AlbumImage />
            </div>
            <div className="album__content">
                <span className="album__title">
                    {album.title || t(ETrans.UNTITLED)}
                </span>
                <div className="album__misc">
                    <span className="album__count">
                        {`${media.state.length} `}
                        {t(ETrans.ELEMENT, {
                            count: media.state.length
                        })}
                    </span>
                </div>
            </div>
        </a>
    </Link>
}

export default Album
