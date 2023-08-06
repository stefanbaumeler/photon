import { TAlbum, TMedium } from '@photon/schema'
import ListItem from './ListItem'
import { ListItemProvider } from './ListItemContext'
import { ListProvider } from '@/components/ListView/ListContext'
import { CheckHeader, ControlsHeader, DateTakenHeader, FavoriteHeader, MediaCountHeader, MimetypeHeader, OwnerHeader, PreviewHeader, TitleHeader } from './headers'

type Props = {
    elements: (TMedium | TAlbum)[]
}

export const ListView = ({ elements }: Props) => {
    const items = elements.map((element, k) => {
        return <ListItemProvider
            element={element}
            key={k}
        >
            <ListItem />
        </ListItemProvider>
    })

    return <ListProvider>
        <div className="list-view">
            <table className="list-view__table">
                <thead className="list-view__thead">
                    <tr className="list-view__row">
                        <CheckHeader />
                        <ControlsHeader />
                        <DateTakenHeader />
                        <FavoriteHeader />
                        <MediaCountHeader />
                        <MimetypeHeader />
                        <OwnerHeader />
                        <PreviewHeader />
                        <TitleHeader />
                    </tr>
                </thead>
                <tbody className="list-view__tbody">
                    {items}
                </tbody>
            </table>
        </div>
    </ListProvider>
}
