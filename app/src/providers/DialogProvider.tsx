import { createContext, ReactNode, useState } from 'react'
import { TDialogButton } from '@/types/app'

type Props = {
    children?: ReactNode
}

type TDialogConfig = {
    title?: string
    text?: string
    buttons: TDialogButton[]
    content?: ReactNode
}

interface DialogContext {
    active: boolean
    title: string
    text: string
    buttons: TDialogButton[]
    content: ReactNode
    close: () => void
    open: (props: TDialogConfig) => void
}

const DialogContext = createContext<DialogContext | null>(null)

const DialogProvider = ({ children }: Props) => {
    const [active, setActive] = useState(false)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [buttons, setButtons] = useState([])
    const [content, setContent] = useState<ReactNode>()

    return <DialogContext.Provider value={{
        active,
        title,
        text,
        buttons,
        content,
        open: ({
            title, text, buttons, content
        }: TDialogConfig) => {
            setTitle(title)
            setText(text)
            setButtons(buttons)
            setActive(true)
            setContent(content)
        },
        close: () => setActive(false)
    }}
    >
        {children}
    </DialogContext.Provider>
}

export {
    DialogProvider, DialogContext
}
