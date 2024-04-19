import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { EEditState } from '@/types/app'

type Props = {
    children?: ReactNode
}

interface EditContext {
    state: EEditState
    setState: Dispatch<SetStateAction<EEditState>>
}

const EditContext = createContext<EditContext | null>(null)

const EditProvider = ({ children }: Props) => {
    const [state, setState] = useState(EEditState.OFF)

    return <EditContext.Provider value={{
        state,
        setState
    }}
    >
        {children}
    </EditContext.Provider>
}

const useEditContext = () => {
    const ctx = useContext(EditContext)

    if (!ctx) {
        throw new Error('Context not defined')
    }

    return ctx
}

export {
    EditProvider, useEditContext
}
