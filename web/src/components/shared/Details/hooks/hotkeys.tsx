import { useHotkeysContext } from 'react-hotkeys-hook'
import { useEffect } from 'react'
import { EKeyboardScope } from '@/types/app'
import { useDetailsContext } from '@/providers'
import { useHotkey } from '@/hooks/hotkey'

export const useDetailsHotkeys = (slide: (direction: number) => void) => {
    const details = useDetailsContext()

    useHotkey('Escape', () => {
        disableScope(EKeyboardScope.details)
        details.close()
    }, EKeyboardScope.details)

    useHotkey('ArrowLeft', () => {
        slide(-1)
    }, EKeyboardScope.details)

    useHotkey('ArrowRight', () => {
        slide(1)
    }, EKeyboardScope.details)

    const {
        enableScope, disableScope
    } = useHotkeysContext()

    useEffect(() => {
        if (details.active) {
            enableScope(EKeyboardScope.details)
        }
    }, [details.active, enableScope])
}
