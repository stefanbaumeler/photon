import { useParams } from 'next/navigation'
import { useQMedium } from '@photon/schema/dist/client'
import { useEffect, useState } from 'react'

export const useMediumFromRouter = () => {
    const query = useParams()
    const id = Array.isArray(query.idMedium) ? query.idMedium[0] : query.idMedium
    const [medium, setMedium] = useState()

    useEffect(() => {

    }, [query])

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
