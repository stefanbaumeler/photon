import ListItem from './ListItem'
import { useSearchContext } from '@/providers'

const ListItems = () => {
    const { hits: media } = useSearchContext()

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
