import { useEffect, useState } from 'react'
import { useMRotate } from '@photon/schema'
import { useDetailsContext } from '@/providers'

export const useRotate = () => {
    const [loading, setLoading] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [, rotate] = useMRotate()
    const [updatedSource, setUpdatedSource] = useState(0)
    const details = useDetailsContext()

    useEffect(() => {
        setRotation(details.rotationRequest)
        const timer = setTimeout(() => {
            if (rotation !== 0 && details.medium) {
                rotate({
                    id: details.medium.id,
                    deg: details.rotationRequest
                }).then(() => {
                    details.resolveRotationRequest()
                    setUpdatedSource(updatedSource + 1)
                    setLoading(true)
                })
            }
        }, 250)
        return () => {
            clearTimeout(timer)
        }
    }, [updatedSource, rotation, details, rotate])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [loading])

    return {
        loading,
        rotation,
        updatedSource
    }
}
