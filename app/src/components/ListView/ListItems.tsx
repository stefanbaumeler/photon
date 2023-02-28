import ListItem from './ListItem'
import { TMedium } from '@photon/schema'

type Props = {
    media: TMedium[]
}

const ListItems = ({ media }: Props) => {
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
