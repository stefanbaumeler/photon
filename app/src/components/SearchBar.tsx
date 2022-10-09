import { Brand, Search, BulkActions, AlbumsActions, EditActions, DefaultActions } from '@/components'

const SearchBar = () => {
    return <div className="searchbar">
        <Brand />
        <Search />
        <BulkActions />
        <EditActions />
        <AlbumsActions />
        <DefaultActions />
    </div>
}

export default SearchBar
