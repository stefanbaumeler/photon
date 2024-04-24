import { useEffect, useState } from 'react'
import { useMRotate } from '@photon/schema/dist/client'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

export const useRotate = () => {
    const [loading, setLoading] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [rotationRequest, setRotationRequest] = useState(0)
    const [, rotate] = useMRotate()
    const [updatedSource, setUpdatedSource] = useState(0)
    const {  id } = useMediumFromRouter()

    useEffect(() => {
        setRotation(rotationRequest)
        const timer = setTimeout(() => {
            if (rotation !== 0) {
                rotate({
                    id,
                    deg: rotationRequest
                }).then(() => {
                    setRotationRequest(0)
                    setUpdatedSource(updatedSource + 1)
                    setLoading(true)
                })
            }
        }, 250)
        return () => {
            clearTimeout(timer)
        }
    }, [updatedSource, rotation, id, rotate, rotationRequest])

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
        updatedSource,
        rotate: () => {
            setRotationRequest(rotationRequest + 90)
        }
    }
}
