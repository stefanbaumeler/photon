import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useMRotate } from '@photon/schema/dist/client'

type Props = {
    children?: ReactNode
}

interface RotationContext {
    loading: boolean
    rotation: number
    updatedSource: number
    rotationRequest: number
    rotate: (medium: string) => void
    sourceLoadedCallback: () => void
}

const RotationContext = createContext<RotationContext | null>(null)

const RotationProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [rotationRequest, setRotationRequest] = useState(0)
    const [, rotate] = useMRotate()
    const [updatedSource, setUpdatedSource] = useState(0)
    const [mediumToRotate, setMediumToRotate] = useState('')

    useEffect(() => {
        setRotation(rotationRequest)
        const timer = setTimeout(() => {
            if (rotation !== 0 && mediumToRotate) {
                rotate({
                    id: mediumToRotate,
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
    }, [updatedSource, rotation, mediumToRotate, rotate, rotationRequest])

    return <RotationContext.Provider value={{
        loading,
        rotation,
        updatedSource,
        rotationRequest,
        sourceLoadedCallback: () => {
            setLoading(false)
        },
        rotate: (medium) => {
            setMediumToRotate(medium)
            setRotationRequest(rotationRequest + 90)
        }
    }}
    >
        {children}
    </RotationContext.Provider>
}

const useRotationContext = () => {
    const ctx = useContext(RotationContext)

    if (!ctx) {
        throw new Error('Context not defined')
    }

    return ctx
}

export {
    RotationProvider, useRotationContext
}
