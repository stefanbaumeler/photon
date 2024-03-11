import { Brand, Search, FocusOverlay } from '@/components'
import { AlbumsControls,
    EditControls,
    DefaultControls,
    AlbumControls,
    BulkAlbumsControls, BulkMediaControls } from '@/components/control-groups'
import { useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import { useRouter } from 'next/router'

export const SearchBar = () => {
    const selection = useSelectionContext()
    const router = useRouter()

    const isAlbumPage = router.pathname === '/albums/[idAlbum]'
    const isAlbumsPage = router.pathname === '/albums'

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
