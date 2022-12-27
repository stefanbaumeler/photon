import { useContext } from 'react'
import { DetailsContext, MediaContext } from '@/providers'
import { QMediaDocument, useMRotate } from '@/api'

const useRotate = (idMedium: string) => {
    const details = useContext(DetailsContext)
    const media = useContext(MediaContext)

    const [rotate] = useMRotate({
        variables: {
            id: idMedium
        },
        refetchQueries: [{
            query: QMediaDocument,
            variables: {
                sort: media.sort
            }
        }],
        awaitRefetchQueries: true
    })

    return () => {
        rotate().then(() => {
            details.setMedium(details.medium)
        })
    }
}

export default useRotate
