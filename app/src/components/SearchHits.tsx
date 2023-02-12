import { useHits } from 'react-instantsearch-hooks-web'
import { TMedium } from '@photon/schema'
import { SearchHit } from '@/components/SearchHit'

export const SearchHits = () => {
    const { hits } = useHits<TMedium>()
    const hitElements = hits.map((hit, key) => <SearchHit
        key={key}
        hit={hit}
    />)
    return <div className="search__hits">
        {hitElements}
    </div>
}
