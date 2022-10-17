import { DependencyList, useEffect } from 'react'

const useKeyboard = (event: string, key: string, callback: () => void, deps: DependencyList) => {
    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            if (event.key === key) {
                callback()
            }
        }

        window.addEventListener(event, keydown)

        return () => {
            window.removeEventListener(event, keydown)
        }
    }, deps)
}

export default useKeyboard
