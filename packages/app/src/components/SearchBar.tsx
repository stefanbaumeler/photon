import { Brand, Search, BulkActions, AlbumsActions, EditActions, DefaultActions, AlbumActions } from '@/components/index'

const SearchBar = () => {
    return <div className="searchbar">
        <div className="searchbar__section searchbar__section--left">
            <Brand />
        </div>
        <div className="searchbar__section searchbar__section--center">
            <Search />
        </div>
        <div className="searchbar__section searchbar__section--right">
            <AlbumActions />
            <BulkActions />
            <EditActions />
            <AlbumsActions />
            <DefaultActions />
        </div>
    </div>
}

export default SearchBar
