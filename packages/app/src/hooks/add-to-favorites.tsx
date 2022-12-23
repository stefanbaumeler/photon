import { QMediaDocument, useMAddToFavorites } from '@/api'
import { useContext } from 'react'
import { SelectionContext } from '@/providers'

const useAddToFavorites = (media: string[]) => {
    const selection = useContext(SelectionContext)

    const [addToFavorites] = useMAddToFavorites({
        variables: {
            media
        },
        refetchQueries: [QMediaDocument]
    })

    return () => {
        addToFavorites().then(() => {
            selection.clear()
        })
    }
}

export default useAddToFavorites
