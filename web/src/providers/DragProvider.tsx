import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

type Props = {
    children?: ReactNode
}

interface DragContext {
    dragging?: string
    setDragging: Dispatch<SetStateAction<string | undefined>>
}

const DragContext = createContext<DragContext | null>(null)

const DragProvider = ({ children }: Props) => {
    const [dragging, setDragging] = useState<string>()

    return <DragContext.Provider value={{
        dragging,
        setDragging
    }}
    >
        {children}
    </DragContext.Provider>
}

const useDragContext = () => {
    const ctx = useContext(DragContext)

    if (!ctx) {
        throw new Error('Context not defined')
    }

    return ctx
}

export {
    DragProvider, useDragContext
}
