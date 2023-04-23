import { Brand, Search, BulkActions, AlbumsActions, EditActions, DefaultActions, AlbumActions } from '.'

export const SearchBar = () => {
    return <div className="searchbar">
        <div className="searchbar__section searchbar__section--left">
            <Brand />
        </div>
        <div className="searchbar__section searchbar__section--center">
            <Search />
        </div>
        <div className="searchbar__section searchbar__section--right">
            <BulkActions />
            <EditActions />
            <AlbumsActions />
            <AlbumActions />
            <DefaultActions />
        </div>
    </div>
}
