import { useHotkeysContext } from 'react-hotkeys-hook'
import { EKeyboardScope } from '@/types/app'

export const useDialog = () => {
    const { disableScope } = useHotkeysContext()

    const closeDialog = () => {
        disableScope(EKeyboardScope.dialog)
    }

    return {
        closeDialog
    }
}
