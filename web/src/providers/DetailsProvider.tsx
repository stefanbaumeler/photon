import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { TMedium, useQMedium } from '@photon/schema'
import { useRouter } from 'next/router'
import { TCover } from '@/types/app'

type Props = {
    children?: ReactNode
}

interface DetailsContext {
    active: boolean
    medium?: TMedium
    placeholder?: TCover
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
    const [medium, setMedium] = useState<TMedium>()
    const [placeholder, setPlaceholder] = useState<TCover>()
    const idMedium = Array.isArray(router.query.idMedium) ? router.query.idMedium.join('') : router.query.idMedium
    const [rotationRequest, setRotationRequest] = useState(0)

    const [mediumQuery] = useQMedium({
        variables: {
            id: idMedium
        },
        pause: !idMedium
    })

    useEffect(() => {
        if (mediumQuery.data?.medium) {
            setActive(true)
            setMedium(mediumQuery.data?.medium as TMedium)
        }
    }, [mediumQuery.data?.medium])

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

    const open = (newMedium: TCover) => {
        setActive(true)
        setMedium(undefined)
        setPlaceholder(newMedium)

        if (router.query.idMedium !== newMedium.id) {
            router.push(getUrl(newMedium.id), null, {
                shallow: true
            })
        }
    }

    return <DetailsContext.Provider value={{
        active,
        medium,
        placeholder,
        getUrl,
        open,
        close: async () => {
            setRotationRequest(0)
            setActive(false)
            setMedium(null)
            setPlaceholder(null)

            let newUrl = router.pathname

            if (router.query.idAlbum) {
                newUrl = `/albums/${router.query.idAlbum}/`
            }

            await router.push(newUrl, null, {
                shallow: true
            })
        },
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
    return useContext(DetailsContext)
}

export {
    DetailsProvider, useDetailsContext
}
