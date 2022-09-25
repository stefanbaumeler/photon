import { Brand, Search, BulkActions, AlbumsActions } from '@/components'

const SearchBar = () => {
    return <div className="searchbar">
        <Brand />
        <Search />
        <BulkActions />
        <AlbumsActions />
    </div>
}

export default SearchBar
