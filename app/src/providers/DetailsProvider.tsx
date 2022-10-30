import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { TMedium } from '@/types/api'
import { useRouter } from 'next/router'

type Props = {
    children?: ReactNode
}

interface DetailsContext {
    active: boolean
    infos: boolean
    medium: TMedium
    collection: TMedium[]
    setCollection: Dispatch<SetStateAction<TMedium[]>>
    open: (medium: TMedium) => void
    close: () => void
    openInfos: () => void
    closeInfos: () => void
}
const DetailsContext = createContext<DetailsContext | null>(null)

const DetailsProvider = ({ children }: Props) => {
    const [medium, setMedium] = useState<TMedium>({})
    const [collection, setCollection] = useState([])
    const [active, setActive] = useState(false)
    const [infos, setInfos] = useState(true)
    const router = useRouter()

    return <DetailsContext.Provider value={{
        active,
        infos,
        medium,
        collection,
        setCollection,
        open: (newMedium) => {
            setMedium(newMedium)
            setActive(true)

            let newUrl = `/media/${newMedium.id}`

            if (router.query.idAlbum) {
                newUrl = `/albums/${router.query.idAlbum}/media/${newMedium.id}`
            }

            router.push(newUrl, null, {
                shallow: true
            })
        },
        close: () => {
            let newUrl = '/'

            if (router.query.idAlbum) {
                newUrl = `/albums/${router.query.idAlbum}/`
            }

            router.push(newUrl, null, {
                shallow: true
            }).then(() => {
                setActive(false)
                setMedium({})
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

export {
    DetailsProvider, DetailsContext
}
