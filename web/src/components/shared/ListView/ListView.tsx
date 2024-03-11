import { AlbumListItem, MediumListItem } from '.'
import { TAlbumListItem, TMediumListItem } from '@/types/app'

type Props = {
    media?: TMediumListItem[]
    albums?: TAlbumListItem[]
}

export const ListView = ({
    media, albums
}: Props) => {
    const items = media ? media.map((medium, key) => {
        return <MediumListItem
            {...medium}
            key={key}
        />
    }) : albums.map((album, key) => {
        return <AlbumListItem
            {...album}
            key={key}
        />
    })

    return <div className="list-view">
        <div className="list-view__header">
        </div>
        <table className="list-view__table">
            <tbody className="list-view__tbody">
                {items}
            </tbody>
        </table>
    </div>
}
