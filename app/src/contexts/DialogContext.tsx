import { createContext } from 'react'
import { TDialogButton } from '@/types/app'

interface DialogContext {
    active: boolean
    text: string
    buttons: TDialogButton[]
    closeDialog: () => void
    openDialog: (text: string, buttons: TDialogButton[]) => void
}

const context = createContext<DialogContext | null>(null)

export default context
