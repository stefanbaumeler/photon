import { createContext, ReactNode, useState } from 'react'
import { TMedium } from '@/types/api'

type Props = {
    children?: ReactNode
}

interface DetailsContext {
    active: boolean
    infos: boolean
    medium: TMedium
    collection: TMedium[]
    openDetails: (medium: TMedium, collection: TMedium[]) => void
    closeDetails: () => void
    openInfos: () => void
    closeInfos: () => void
}
const DetailsContext = createContext<DetailsContext | null>(null)

const DetailsProvider = ({ children }: Props) => {
    const [medium, setMedium] = useState({})
    const [collection, setCollection] = useState([])
    const [active, setActive] = useState(false)
    const [infos, setInfos] = useState(true)

    return <DetailsContext.Provider value={{
        active,
        infos,
        medium,
        collection,
        openDetails: (newMedium, newCollection) => {
            setCollection(newCollection)
            setMedium(newMedium)
            setActive(true)
        },
        closeDetails: () => {
            setMedium({})
            setActive(false)
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
