import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook'

type Props = {
    key: string
    callback: () => void
    scopes?: string | string[]
    condition?: boolean
    keyup?: boolean
}

export const useHotkey = ({
    key, callback, scopes, condition, keyup = false
}: Props) => {
    const { enabledScopes } = useHotkeysContext()

    useHotkeys(key, callback, {
        scopes,
        enabled: (!scopes || scopes.includes(enabledScopes.slice(-1)[0])) && condition,
        keydown: !keyup,
        keyup
    })
}
