import { TCover } from '@/components'
import { TUser } from '@photon/schema'
import MediumListItem from '@/components/ListView/MediumListItem'
import AlbumListItem from '@/components/ListView/AlbumListItem'

type TListItem = {
    id: string
    cover: TCover | null
    title: string
    owner: Pick<TUser, 'firstName' | 'lastName'>
}

export type TMediumListItem = TListItem & {
    favoredBy?: number
    dateTaken: string
    mimetype: string
}

export type TAlbumListItem = TListItem & {
    albumMedia: string[]
}

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
