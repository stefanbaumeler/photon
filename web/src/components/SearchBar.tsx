import { Brand, Search, FocusOverlay } from '@/components'
import { AlbumsControls,
    EditControls,
    DefaultControls,
    AlbumControls,
    BulkAlbumsControls, BulkMediaControls } from '@/components/control-groups'

export const SearchBar = () => {
    return <div className="searchbar">
        <FocusOverlay />
        <div className="searchbar__section searchbar__section--left">
            <Brand />
        </div>
        <div className="searchbar__section searchbar__section--center">
            <Search />
        </div>
        <div className="searchbar__section searchbar__section--right">
            <BulkAlbumsControls />
            <BulkMediaControls />
            <EditControls />
            <AlbumsControls />
            <AlbumControls />
            <DefaultControls />
        </div>
    </div>
}
