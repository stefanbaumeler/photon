import { Brand, Search, BulkActions, AlbumsActions } from '@/components'
import EditActions from '@/components/EditActions'

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
