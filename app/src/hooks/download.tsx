import { useQDownload } from '@photon/schema'
import { useSelectionContext } from '@/providers'

const useDownload = (skip: boolean) => {
    const selection = useSelectionContext()

    return useQDownload({
        variables: {
            media: Array.from(selection.selected).map((medium) => medium.id)
        },
        skip
    })
}

export default useDownload
