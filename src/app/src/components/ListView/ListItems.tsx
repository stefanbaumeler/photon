import ListItem from './ListItem'
import { useContext } from 'react'
import { MediaContext } from '@/providers'

const ListItems = () => {
    const media = useContext(MediaContext)

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
