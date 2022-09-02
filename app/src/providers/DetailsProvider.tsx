import { DetailsContext } from '@/contexts'
import { ReactNode, useState } from 'react'

type Props = {
    children?: ReactNode
}

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

export default DetailsProvider
