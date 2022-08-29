import { DetailsContext } from '@/contexts'
import { ReactNode, useState } from 'react'

type Props = {
    children?: ReactNode
}

const DetailsProvider = ({ children }: Props) => {
    const [medium, setMedium] = useState({})
    const [active, setActive] = useState(false)

    return <DetailsContext.Provider value={{
        active,
        medium,
        openDetails: (newSrc) => {
            setMedium(newSrc)
            setActive(true)
        },
        closeDetails: () => {
            setMedium({})
            setActive(false)
        }
    }}
    >
        {children}
    </DetailsContext.Provider>
}

export default DetailsProvider
