import { useRouter } from 'next/router'
import { useQMedium } from '@photon/schema'

export const useMediumFromRouter = () => {
    const router = useRouter()
    const id = Array.isArray(router.query.idMedium) ? router.query.idMedium?.join('') : router.query.idMedium

    const [{ data }] = useQMedium({
        variables: {
            id: id ?? ''
        },
        pause: !id
    })

    return {
        medium: data?.medium,
        id
    }
}
