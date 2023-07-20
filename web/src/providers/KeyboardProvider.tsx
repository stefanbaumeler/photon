import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

type Props = {
    children?: ReactNode
}

interface KeyboardContext {
    isTyping: boolean
    setIsTyping: Dispatch<SetStateAction<boolean>>
}

const KeyboardContext = createContext<KeyboardContext | null>(null)

const KeyboardProvider = ({ children }: Props) => {
    const [isTyping, setIsTyping] = useState(false)

    return <KeyboardContext.Provider value={{
        isTyping,
        setIsTyping
    }}
    >
        {children}
    </KeyboardContext.Provider>
}

const useKeyboardContext = () => {
    return useContext(KeyboardContext)
}
export {
    KeyboardProvider, useKeyboardContext
}
