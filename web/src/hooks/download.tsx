import { useQDownload } from '@photon/schema'
import { useSelectionContext } from 'web/src/providers'
import { isAlbum } from 'web/src/util/is'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useDownload = (ids?: string[]) => {
    const selection = useSelectionContext()
    const router = useRouter()
    const [skip, setSkip] = useState(true)

    const media = ids ? ids : [...selection.selected].map((element) => {
        if (isAlbum(element)) {
            return element.albumMedia.map((albumMedium) => {
                return albumMedium.idMedium
            })
        }

        return element.id
    }).flat()

    const download = useQDownload({
        variables: {
            media
        },
        skip
    })

    useEffect(() => {
        if (download.data) {
            router.push(`http://localhost:11011${download.data?.download.url}`)
        }

        setSkip(true)
    }, [download.data])

    return () => {
        setSkip(false)
    }
}

export default useDownload
