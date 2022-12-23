import { QMediaDocument, useMRemoveFromFavorites } from '@/api'
import { useContext } from 'react'
import { SelectionContext } from '@/providers'

const useRemoveFromFavorites = (media: string[]) => {
    const selection = useContext(SelectionContext)

    const [removeFromFavorites] = useMRemoveFromFavorites({
        variables: {
            media
        },
        refetchQueries: [QMediaDocument]
    })

    return () => {
        removeFromFavorites().then(() => {
            selection.clear()
        })
    }
}

export default useRemoveFromFavorites
