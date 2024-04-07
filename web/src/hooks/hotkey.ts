import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook'
export const useHotkey = (key: string, callback: () => void, scopes?: string | string[], condition?: boolean) => {
    const { enabledScopes } = useHotkeysContext()

    useHotkeys(key, callback, {
        scopes,
        enabled: (!scopes || scopes.includes(enabledScopes.slice(-1)[0])) && condition
    })
}
