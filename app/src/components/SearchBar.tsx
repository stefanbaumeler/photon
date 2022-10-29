import { Brand, Search, BulkActions, AlbumsActions, EditActions, DefaultActions, AlbumActions } from '@/components'

const SearchBar = () => {
    return <div className="searchbar">
        <Brand />
        <Search />
        <AlbumActions />
        <BulkActions />
        <EditActions />
        <AlbumsActions />
        <DefaultActions />
    </div>
}

export default SearchBar
