import { useContext } from 'react'
import { DetailsContext } from '@/providers'
import { MediaQueryDocument,
    useRotate as useRotateMutation } from '@/types/api'

const useRotate = () => {
    const details = useContext(DetailsContext)

    const [rotate] = useRotateMutation({
        variables: {
            id: details.medium.id
        },
        refetchQueries: [MediaQueryDocument],
        awaitRefetchQueries: true
    })

    return () => {
        rotate()
    }
}

export default useRotate
