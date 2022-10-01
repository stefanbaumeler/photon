import { Brand, Search, BulkActions, AlbumsActions, EditActions } from '@/components'

const SearchBar = () => {
    return <div className="searchbar">
        <Brand />
        <Search />
        <BulkActions />
        <EditActions />
        <AlbumsActions />
    </div>
}

export default SearchBar
