import { useDetailsContext } from '@/providers'
import { useMRotate } from '@photon/schema'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

const useRotate = (idMedium: string) => {
    const details = useDetailsContext()
    const instantSearch = useInstantSearch()

    const [rotate] = useMRotate({
        variables: {
            id: idMedium
        },
        awaitRefetchQueries: true
    })

    return () => {
        rotate().then(() => {
            instantSearch.refresh()
            details.setMedium(details.medium)
        })
    }
}

export default useRotate
