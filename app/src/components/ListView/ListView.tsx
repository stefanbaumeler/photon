import ListItems from './ListItems'

export const ListView = () => {
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
