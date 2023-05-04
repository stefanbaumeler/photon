import { useQDownload } from '@photon/schema'
import { useSelectionContext } from '@/providers'
import { isAlbum } from '@/util/is'

const useDownload = (skip: boolean) => {
    const selection = useSelectionContext()

    const ids = [...selection.selected].map((element) => {
        if (isAlbum(element)) {
            return element.albumMedia.map((albumMedium) => {
                return albumMedium.idMedium
            })
        }

        return element.id
    }).flat()

    return useQDownload({
        variables: {
            media: ids
        },
        skip
    })
}

export default useDownload
