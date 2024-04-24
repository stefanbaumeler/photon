'use client'

import { ESelectionMode } from '@/types/app'
import { useParams, usePathname } from 'next/navigation'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { FocusOverlay } from '@/components/shared/FocusOverlay'
import { Brand } from '@/components/shared/Brand'
import { Search } from '@/components/shared/Search'
import { BulkAlbumsControls } from '@/components/control-groups/BulkAlbumsControls'
import { BulkMediaControls } from '@/components/control-groups/BulkMediaControls'
import { EditControls } from '@/components/control-groups/EditControls'
import { AlbumsControls } from '@/components/control-groups/AlbumsControls'
import { AlbumControls } from '@/components/control-groups/AlbumControls'
import { DefaultControls } from '@/components/control-groups/DefaultControls'

export const SearchBar = () => {
    const selection = useSelectionContext()
    const pathname = usePathname()
    const params = useParams()

    const isAlbumPage = !!params.idAlbum
    const isAlbumsPage = pathname === '/albums'

    return <div className="searchbar">
        <FocusOverlay />
        <div className="searchbar__section searchbar__section--left">
            <Brand />
        </div>
        <div className="searchbar__section searchbar__section--center">
            <Search />
        </div>
        <div className="searchbar__section searchbar__section--right">
            {selection.mode === ESelectionMode.ALBUMS ? <BulkAlbumsControls /> : null}
            {selection.mode === ESelectionMode.SELECT ? <BulkMediaControls /> : null}
            {selection.mode === ESelectionMode.DELETE || selection.mode === ESelectionMode.SINGLE ? <EditControls /> : null}
            {isAlbumsPage && selection.mode === ESelectionMode.OFF ? <AlbumsControls /> : null}
            {isAlbumPage && selection.mode === ESelectionMode.OFF ? <AlbumControls /> : null}
            {!isAlbumsPage && selection.mode === ESelectionMode.OFF && !isAlbumPage ? <DefaultControls /> : null}
        </div>
    </div>
}
