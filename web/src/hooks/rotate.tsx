import { useDetailsContext, useSearchContext } from '@/providers'
import { useMRotate } from '@photon/schema'

const useRotate = (idMedium: string) => {
    const details = useDetailsContext()
    const search = useSearchContext()

    const [rotate] = useMRotate({
        variables: {
            id: idMedium
        },
        awaitRefetchQueries: true
    })

    return () => {
        rotate().then(() => {
            search.instantSearch.refresh()
            details.setMedium(details.medium)
        })
    }
}

export default useRotate
