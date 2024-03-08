import { useQDownload } from '@photon/schema'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {
    elements: string[]
    callback?: () => void
}

export const useDownload = ({
    elements, callback
}: Props) => {
    const router = useRouter()
    const [skip, setSkip] = useState(true)

    const [download] = useQDownload({
        variables: {
            ids: elements
        },
        pause: skip
    })

    useEffect(() => {
        if (download.data && !skip) {
            router.push(`http://0.0.0.0:11011${download.data?.download.url}`)
            callback && callback()
            setSkip(true)
        }
    }, [router, download.data, callback])

    return () => {
        setSkip(false)
    }
}
