import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

type Props = {
    children?: ReactNode
}

interface DragContext {
    dragging: string
    setDragging: Dispatch<SetStateAction<string>>
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
    return useContext(DragContext)
}
export {
    DragProvider, useDragContext
}
