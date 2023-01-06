import { createContext, ReactNode, useContext, useState } from 'react'
import { TDialogButton } from '@/types/app'

type Props = {
    children?: ReactNode
}

type TDialogConfig = {
    id: string
    title?: string
    text?: string
    buttons: TDialogButton[]
    content?: ReactNode
}

interface DialogContext {
    id: string
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
    const [id, setId] = useState('')
    const [active, setActive] = useState(false)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [buttons, setButtons] = useState([])
    const [content, setContent] = useState<ReactNode>()

    return <DialogContext.Provider value={{
        id,
        active,
        title,
        text,
        buttons,
        content,
        open: ({
            title, text, buttons, content, id
        }: TDialogConfig) => {
            setTitle(title)
            setText(text)
            setButtons(buttons)
            setActive(true)
            setContent(content)
            setId(id)
        },
        close: () => setActive(false)
    }}
    >
        {children}
    </DialogContext.Provider>
}

const useDialogContext = () => {
    return useContext(DialogContext)
}

export {
    DialogProvider, useDialogContext
}
