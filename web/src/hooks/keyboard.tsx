import { useEffect, useRef } from 'react'
import { useKeyboardContext } from '@/providers'

export const useKeyboard = (event: string, key: string, callback: () => void) => {
    const keyboard = useKeyboardContext()

    const ref = useRef({
        event,
        key,
        callback
    })
    ref.current = {
        event,
        key,
        callback
    }

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            if (event.key === ref.current.key && !keyboard.isTyping) {
                ref.current.callback()
            }
        }

        window.addEventListener(ref.current.event, keydown)

        return () => {
            window.removeEventListener(ref.current.event, keydown)
        }
    }, [keyboard.isTyping])
}
