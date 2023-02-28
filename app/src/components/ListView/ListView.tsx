import ListItems from './ListItems'
import { TMedium } from '@photon/schema'

type Props = {
    media: TMedium[]
}

export const ListView = ({ media }: Props) => {
    return <div className="list-view">
        <div className="list-view__header">
        </div>
        <table className="list-view__table">
            <tbody className="list-view__tbody">
                <ListItems media={media} />
            </tbody>
        </table>
    </div>
}
