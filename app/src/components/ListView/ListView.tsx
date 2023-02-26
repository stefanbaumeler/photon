import ListItems from './ListItems'
import { useLayoutContext } from '@/providers'

export const ListView = () => {
    const layout = useLayoutContext()
    console.log(layout)
    return <div className="list-view">
        <div className="list-view__header">
        </div>
        <table className="list-view__table">
            <tbody className="list-view__tbody">
                <ListItems />
            </tbody>
        </table>
    </div>
}
