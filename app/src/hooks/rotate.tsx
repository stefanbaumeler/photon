import { useContext } from 'react'
import { DetailsContext } from '@/providers'
import { MediaQueryDocument,
    useRotate as useRotateMutation } from '@/types/api'

const useRotate = (idMedium: string) => {
    const details = useContext(DetailsContext)

    const [rotate] = useRotateMutation({
        variables: {
            id: idMedium
        },
        refetchQueries: [MediaQueryDocument],
        awaitRefetchQueries: true
    })

    return () => {
        rotate().then(() => {
            details.setMedium(details.medium)
        })
    }
}

export default useRotate
