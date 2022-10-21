import { TAlbum, useAlbumMediaQuery, useMediumQuery } from '@/types/api'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'

type Props = {
    album: TAlbum
}

const Album = ({ album }: Props) => {
    const { t } = useTranslation()

    const albumMediaQuery = useAlbumMediaQuery({
        variables: {
            id: album.id
        }
    })

    const thumbnailQuery = useMediumQuery({
        variables: {
            id: `${album.idMedium}`
        }
    })

    if (thumbnailQuery.loading || albumMediaQuery.loading) {
        return <></>
    }

    const thumbnail = thumbnailQuery.data?.medium[0] || {}
    const media = albumMediaQuery.data.albumMedia

    const AlbumImage = () => {
        if (!thumbnail.filenameDisk) {
            return <></>
        }

        return <img
            className="album__image"
            src={`${process.env.NEXT_PUBLIC_UPLOADS_DIR}${thumbnail.filenameDisk}?w=800`}
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
                        {`${media.length} `}
                        {t(ETrans.ELEMENT, {
                            count: media.length
                        })}
                    </span>
                </div>
            </div>
        </a>
    </Link>
}

export default Album
