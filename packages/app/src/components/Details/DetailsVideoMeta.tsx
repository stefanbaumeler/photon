import { useContext } from 'react'
import { DetailsContext } from '@/providers'

export const DetailsVideoMeta = () => {
    const details = useContext(DetailsContext)

    if (!details.medium.mimetype?.startsWith('video')) {
        return <></>
    }
    return <></>
}
