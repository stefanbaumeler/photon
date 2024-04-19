import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { TMedium, useQMedium } from '@photon/schema'
import { useRouter } from 'next/router'
import { TCover } from '@/types/app'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

type Props = {
    children?: ReactNode
}

interface DetailsContext {
    active: boolean
    medium?: TMedium | null
    placeholder?: TCover | null
    getUrl: (medium: string) => string
    open: (medium: TCover) => void
    close: () => Promise<void>
    rotationRequest: number
    resolveRotationRequest: () => void
    rotate: () => void
}

const DetailsContext = createContext<DetailsContext | null>(null)

const DetailsProvider = ({ children }: Props) => {
    const router = useRouter()
    const [active, setActive] = useState(false)
    const [medium, setMedium] = useState<TMedium | null>(null)
    const [placeholder, setPlaceholder] = useState<TCover | null>(null)
    const [rotationRequest, setRotationRequest] = useState(0)

    const {
        medium: fetchedMedium, id
    } = useMediumFromRouter()

    const getUrl = (mediumId: string) => {
        const path = router.pathname.endsWith('/') ? router.pathname.slice(0, -1) : router.pathname
        let newUrl = `${path}/media/${mediumId}`

        if (router.query.idAlbum) {
            newUrl = `/albums/${router.query.idAlbum}/media/${mediumId}`
        }

        if (path.includes('favorites')) {
            newUrl = `${path}/${mediumId}`
        }

        return newUrl
    }

    const open = useCallback(async (newMedium: TCover) => {
        setActive(true)
        setMedium(fetchedMedium as TMedium)
        setPlaceholder(newMedium)

        if (router.query.idMedium !== newMedium.id) {
            await router.push(getUrl(newMedium.id), undefined, {
                shallow: true
            })
        }
    }, [fetchedMedium, getUrl, router])

    useEffect(() => {
        if (fetchedMedium && fetchedMedium?.id === id) {
            open(fetchedMedium)
        }
    }, [fetchedMedium, id, open])

    const close = async () => {
        let newUrl = router.pathname

        if (router.query.idAlbum) {
            newUrl = `/albums/${router.query.idAlbum}/`
        }

        await router.push(newUrl, undefined, {
            shallow: true
        })

        setRotationRequest(0)
        setActive(false)
        setMedium(null)
        setPlaceholder(null)
    }

    return <DetailsContext.Provider value={{
        active,
        medium,
        placeholder,
        getUrl,
        open,
        close,
        rotationRequest,
        resolveRotationRequest: () => {
            setRotationRequest(0)
        },
        rotate: () => {
            setRotationRequest(rotationRequest + 90)
        }
    }}
    >
        {children}
    </DetailsContext.Provider>
}

const useDetailsContext = () => {
    const ctx = useContext(DetailsContext)

    if (!ctx) {
        throw new Error('Context not defined')
    }

    return ctx
}

export {
    DetailsProvider, useDetailsContext
}
