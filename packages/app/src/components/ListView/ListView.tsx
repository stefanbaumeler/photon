import { TMedium } from '@/api'
import ListItems from './ListItems'

type Props = {
    media: TMedium[]
}

export const ListView = ({ media }: Props) => {
    return <div className="list-view">
        <div className="list-view__header">
            sort
        </div>
        <table className="list-view__table">
            <tbody className="list-view__tbody">
                <ListItems media={media} />
            </tbody>
        </table>
    </div>
}
