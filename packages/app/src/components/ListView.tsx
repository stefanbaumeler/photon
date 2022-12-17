import { TMedium } from '@/api'
import { ListItem } from '@/components/index'

type Props = {
    media: TMedium[]
}

const ListView = ({ media }: Props) => {
    const listItems = media.map((medium, k) => {
        return <ListItem
            medium={medium}
            key={k}
        />
    })

    return <div className="list-view">
        <div className="list-view__header">
            sort
        </div>
        <table className="list-view__table">
            <tbody className="list-view__tbody">
                {listItems}
            </tbody>
        </table>
    </div>
}

export default ListView
