'use client'

import { useQAlbums } from '@photon/schema/dist/client'
import { ELayout } from '@/types/app'
import { useLayoutContext } from '@/providers/LayoutProvider'
import { GridView } from '@/components/shared/GridView'
import { ListView } from '@/components/shared/ListView'

export const Albums = () => {
    const [{  data }] = useQAlbums()
    const layout = useLayoutContext()

    if (!data?.albums) {
        return null
    }

    if (layout.albumsLayout === ELayout.GRID) {
        return <GridView
            albums
            elements={data.albums.map((album) => {
                return {
                    id: album.id,
                    cover: album.cover ?? null,
                    href: `albums/${album.id}`,
                    title: album.title ?? undefined,
                    stack: album.media?.map((medium) => medium.id) ?? []
                }
            })}
        />
    }

    if (layout.albumsLayout === ELayout.LIST) {
        return <ListView albums={data.albums.map((album) => {
            return {
                id: album.id,
                cover: album.cover ?? null,
                title: album.title ?? undefined,
                owner: album.owner,
                albumMedia: album.media?.map((medium) => medium.id) ?? []
            }
        })}
        />
    }

    return null
}
