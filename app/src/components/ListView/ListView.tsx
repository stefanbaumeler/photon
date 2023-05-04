import { TAlbum, TMedium } from '@photon/schema'
import ListItem from '@/components/ListView/ListItem'

type Props = {
    elements: (TMedium | TAlbum)[]
}

export const ListView = ({ elements }: Props) => {
    const items = elements.map((element, k) => {
        return <ListItem
            element={element}
            key={k}
        />
    })

    return <div className="list-view">
        <div className="list-view__header">
        </div>
        <table className="list-view__table">
            <tbody className="list-view__tbody">
                {items}
            </tbody>
        </table>
    </div>
}
