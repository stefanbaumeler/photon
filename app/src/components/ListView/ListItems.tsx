import ListItem from './ListItem'
import { useHits } from 'react-instantsearch-hooks-web'
import { TMedium } from '@photon/schema'

const ListItems = () => {
    const { hits: media } = useHits<TMedium>()

    const items = media.map((medium, k) => {
        return <ListItem
            medium={medium}
            key={k}
        />
    })

    return <>
        {items}
    </>
}

export default ListItems
