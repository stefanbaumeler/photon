import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { TMedium } from '@photon/schema'
import { useRouter } from 'next/router'

type Props = {
    children?: ReactNode
}

interface DetailsContext {
    active: boolean
    infos: boolean
    medium: TMedium
    setMedium: Dispatch<SetStateAction<TMedium>>
    open: (medium: TMedium) => void
    close: () => void
    openInfos: () => void
    closeInfos: () => void
}

const DetailsContext = createContext<DetailsContext | null>(null)

const DetailsProvider = ({ children }: Props) => {
    const [medium, setMedium] = useState<TMedium>()
    const [active, setActive] = useState(false)
    const [infos, setInfos] = useState(true)
    const router = useRouter()

    return <DetailsContext.Provider value={{
        active,
        infos,
        medium,
        setMedium,
        open: (newMedium) => {
            setMedium(newMedium)
            setActive(true)

            const path = router.pathname.endsWith('/') ? router.pathname.slice(0, -1) : router.pathname
            let newUrl = `${path}/media/${newMedium.id}`

            if (router.query.idAlbum) {
                newUrl = `/albums/${router.query.idAlbum}/media/${newMedium.id}`
            }

            if (path.includes('favorites')) {
                newUrl = `${path}/${newMedium.id}`
            }

            router.push(newUrl, null, {
                shallow: true
            })
        },
        close: () => {
            let newUrl = router.pathname

            if (router.query.idAlbum) {
                newUrl = `/albums/${router.query.idAlbum}/`
            }

            router.push(newUrl, null, {
                shallow: true
            }).then(() => {
                setActive(false)
                setMedium(undefined)
            })
        },
        openInfos: () => {
            setInfos(true)
        },
        closeInfos: () => {
            setInfos(false)
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
