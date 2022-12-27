import { QFavoritesDocument, QMediaDocument, useMRemoveFromFavorites } from '@/api'
import { useContext } from 'react'
import { SelectionContext, MediaContext } from '@/providers'

const useRemoveFromFavorites = (mediaIds: string[]) => {
    const selection = useContext(SelectionContext)
    const media = useContext(MediaContext)

    const [removeFromFavorites] = useMRemoveFromFavorites({
        variables: {
            media: mediaIds
        },
        refetchQueries: [{
            query: QMediaDocument,
            variables: {
                sort: media.sort
            }
        }, QFavoritesDocument]
    })

    return () => {
        removeFromFavorites().then(() => {
            selection.clear()
        })
    }
}

export default useRemoveFromFavorites
