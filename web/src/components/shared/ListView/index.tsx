'use client'

import { TAlbumListItem, TMediumListItem } from '@/types/app'
import { MediumListItem } from '@/components/shared/ListView/components/MediumListItem'
import { AlbumListItem } from '@/components/shared/ListView/components/AlbumListItem'

type Props = {
    media?: TMediumListItem[]
    albums?: TAlbumListItem[]
}

export const ListView = ({
    media, albums
}: Props) => {
    return <div className="list-view">
        <div className="list-view__header">
        </div>
        <table className="list-view__table">
            <tbody className="list-view__tbody">
                {media ? media.map((medium, key) => <MediumListItem
                    {...medium}
                    key={key}
                />) : null}
                {albums ? albums.map((album, key) => <AlbumListItem
                    {...album}
                    key={key}
                />) : null}
            </tbody>
        </table>
    </div>
}
