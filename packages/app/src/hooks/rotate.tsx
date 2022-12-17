import { useContext } from 'react'
import { DetailsContext } from '@/providers'
import { QMediaDocument, useMRotate } from '@/api'

const useRotate = (idMedium: string) => {
    const details = useContext(DetailsContext)

    const [rotate] = useMRotate({
        variables: {
            id: idMedium
        },
        refetchQueries: [QMediaDocument],
        awaitRefetchQueries: true
    })

    return () => {
        rotate().then(() => {
            details.setMedium(details.medium)
        })
    }
}

export default useRotate
