import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { TMedium } from '@photon/schema'

type Props = {
    children?: ReactNode
}

interface DragContext {
    dragging: TMedium
    setDragging: Dispatch<SetStateAction<TMedium>>
}

const DragContext = createContext<DragContext | null>(null)

const DragProvider = ({ children }: Props) => {
    const [dragging, setDragging] = useState<TMedium>()

    return <DragContext.Provider value={{
        dragging,
        setDragging
    }}
    >
        {children}
    </DragContext.Provider>
}

const useDragContext = () => {
    return useContext(DragContext)
}
export {
    DragProvider, useDragContext
}
