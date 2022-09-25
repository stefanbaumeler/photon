import { createContext, ReactNode, useState } from 'react'
import { TDialogButton } from '@/types/app'

type Props = {
    children?: ReactNode
}

interface DialogContext {
    active: boolean
    text: string
    buttons: TDialogButton[]
    content: ReactNode
    closeDialog: () => void
    openDialog: (text: string, buttons: TDialogButton[], content?: ReactNode) => void
}

const DialogContext = createContext<DialogContext | null>(null)

const DialogProvider = ({ children }: Props) => {
    const [active, setActive] = useState(false)
    const [text, setText] = useState('')
    const [buttons, setButtons] = useState([])
    const [content, setContent] = useState<ReactNode>()

    return <DialogContext.Provider value={{
        active,
        text,
        buttons,
        content,
        openDialog: (text: string, buttons: TDialogButton[], content?: ReactNode) => {
            setText(text)
            setButtons(buttons)
            setActive(true)
            setContent(content)
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
