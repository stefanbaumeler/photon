import { useDetailsContext, useMediaContext } from '@/providers'
import { QMediaDocument, useMRotate } from '@photon/schema'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

const useRotate = (idMedium: string) => {
    const details = useDetailsContext()
    const media = useMediaContext()
    const instantSearch = useInstantSearch()

    const [rotate] = useMRotate({
        variables: {
            id: idMedium
        },
        refetchQueries: [
            {
                query: QMediaDocument,
                variables: {
                    sort: media.sort
                }
            }
        ],
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
