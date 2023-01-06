import { TAlbum, useQAlbumMedia } from '@/api'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { IconButton, Dropdown } from '@/components'
import * as Icons from '@mdi/js'
import { useState } from 'react'
import useDeleteAlbumDialog from '@/dialogs/delete-album'
import AlbumTeaserImage from './AlbumTeaserImage'

type Props = {
    album: Partial<TAlbum>
}

export const AlbumTeaser = ({ album }: Props) => {
    const { t } = useTranslation()

    const [moreActive, setMoreActive] = useState(false)

    const albumMediaQuery = useQAlbumMedia({
        variables: {
            id: album.id
        },
        fetchPolicy: 'no-cache'
    })

    const deleteAlbumDialog = useDeleteAlbumDialog(album.id)

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
        data-testid="album-teaser"
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
            className="album__link"
        >
            <div className="album__image-container">
                <AlbumTeaserImage id={album.cover?.id} />
            </div>
            <div className="album__content">
                <span
                    data-testid="album-teaser-title"
                    className="album__title"
                >
                    {album?.title || t(ETrans.UNTITLED)}
                </span>
                <div className="album__misc">
                    <span
                        className="album__count"
                        data-testid="album-teaser-count"
                    >
                        {`${media.length} `}
                        {t(ETrans.ELEMENT, {
                            count: media.length
                        })}
                    </span>
                </div>
            </div>
        </Link>
    </div>
}
