import { TAlbum, TMedium, useQDownload } from '@photon/schema'
import { isAlbum } from '@/util/is'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { EMediumStatus } from '@/types/app'

type Props = {
    elements: (TMedium | TAlbum)[]
    callback?: () => void
}

export const useDownload = ({
    elements, callback
}: Props) => {
    const router = useRouter()
    const [skip, setSkip] = useState(true)

    const media = elements.map((element) => {
        if (isAlbum(element)) {
            return element.media
                .filter((medium) => medium.status === EMediumStatus.ALL)
                .map(({ id }) => id)
        }

        return element.id
    }).flat()

    const [download] = useQDownload({
        variables: {
            media
        },
        pause: skip
    })

    useEffect(() => {
        if (download.data) {
            router.push(`http://0.0.0.0:11011${download.data?.download.url}`)
            callback && callback()
            setSkip(true)
        }
    }, [router, download.data, callback])

    return () => {
        setSkip(false)
    }
}
