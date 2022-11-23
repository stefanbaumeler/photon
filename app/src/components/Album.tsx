import { TAlbum, useAlbumMediaQuery, useMediumQuery } from '@photon/shared'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { IconButton, Dropdown } from '@/components'
import * as Icons from '@mdi/js'
import { useMemo, useState } from 'react'
import useDeleteAlbumDialog from '@/dialogs/delete-album'

type Props = {
    album: TAlbum
}

const Album = ({ album }: Props) => {
    const { t } = useTranslation()

    const [moreActive, setMoreActive] = useState(false)

    const albumMediaQuery = useAlbumMediaQuery({
        variables: {
            id: album.id
        }
    })

    const deleteAlbumDialog = useDeleteAlbumDialog(album.id)

    const thumbnailQuery = useMediumQuery({
        variables: {
            id: `${album.idMedium}`
        }
    })

    const thumbnail = thumbnailQuery.data?.medium

    const AlbumImage = useMemo(() => {
        if (thumbnailQuery.loading) {
            return <></>
        }

        if (!thumbnail.filenameDisk) {
            return <></>
        }

        return <img
            className="album__image"
            src={`${process.env.NEXT_PUBLIC_UPLOADS_DIR}${thumbnail.filenameDisk}?w=800`}
            alt=""
        />
    }, [thumbnail])

    if (albumMediaQuery.loading) {
        return <></>
    }

    const media = albumMediaQuery.data.albumMedia

    const moreItems = [
        {
            cy: 'album-delete',
            label: t(ETrans.DELETE_THING, {
                thing: t(ETrans.ALBUM)
            }),
            callback: deleteAlbumDialog
        }
    ]

    return <div
        className="album"
        data-cy="album-teaser"
    >
        <div className="album__controls">
            <Dropdown
                items={moreItems}
                active={moreActive}
                onClickOutside={() => setMoreActive(false)}
                smallButton={true}
            >
                <IconButton
                    cy={'album-controls'}
                    icon={Icons.mdiDotsVertical}
                    white={true}
                    onClick={() => setMoreActive(!moreActive)}
                    small={true}
                />
            </Dropdown>
        </div>
        <Link
            href={`albums/${album.id}`}
        >
            <a className="album__link">
                <div className="album__image-container">
                    {AlbumImage}
                </div>
                <div className="album__content">
                    <span
                        data-cy="album-teaser-title"
                        className="album__title"
                    >
                        {album?.title || t(ETrans.UNTITLED)}
                    </span>
                    <div className="album__misc">
                        <span
                            className="album__count"
                            data-cy="album-teaser-count"
                        >
                            {`${media.length} `}
                            {t(ETrans.ELEMENT, {
                                count: media.length
                            })}
                        </span>
                    </div>
                </div>
            </a>
        </Link>
    </div>
}

export default Album
