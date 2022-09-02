import { createContext, ReactNode, useState } from 'react'
import { TDialogButton } from '@/types/app'

type Props = {
    children?: ReactNode
}

interface DialogContext {
    active: boolean
    text: string
    buttons: TDialogButton[]
    closeDialog: () => void
    openDialog: (text: string, buttons: TDialogButton[]) => void
}

const DialogContext = createContext<DialogContext | null>(null)

const DialogProvider = ({ children }: Props) => {
    const [active, setActive] = useState(false)
    const [text, setText] = useState('')
    const [buttons, setButtons] = useState([])

    return <DialogContext.Provider value={{
        active,
        text,
        buttons,
        openDialog: (text: string, buttons: TDialogButton[]) => {
            setText(text)
            setButtons(buttons)
            setActive(true)
        },
        closeDialog: () => setActive(false)
    }}
    >
        {children}
    </DialogContext.Provider>
}

export {
    DialogProvider, DialogContext
}
