import { useDetailsContext } from '@/providers'

export const DetailsVideoMeta = () => {
    const details = useDetailsContext()

    if (!details.medium.mimetype?.startsWith('video')) {
        return <></>
    }
    return <></>
}
