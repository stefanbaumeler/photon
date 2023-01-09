import ListItem from './ListItem'
import { useMediaContext } from '../../providers'

const ListItems = () => {
    const media = useMediaContext()

    const items = media.media.map((medium, k) => {
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
