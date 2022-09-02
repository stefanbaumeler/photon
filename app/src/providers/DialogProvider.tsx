import { DialogContext } from '@/contexts'
import { ReactNode, useState } from 'react'
import { TDialogButton } from '@/types/app'

type Props = {
    children?: ReactNode
}

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

export default DialogProvider
