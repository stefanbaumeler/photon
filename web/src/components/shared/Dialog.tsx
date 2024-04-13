import { Button } from '@/components'
import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { EKeyboardScope } from '@/types/app'
import { useHotkeysContext } from 'react-hotkeys-hook'
import { useHotkey } from '@/hooks/hotkey'

type Props = {
    title?: string
    text?: string
    buttons?: (Parameters<typeof Button>[0])[]
    children?: ReactNode
    closeCallback: () => void
}
export const Dialog = ({
    title, children, buttons = [], text, closeCallback
}: Props) => {
    const {
        enableScope, disableScope
    } = useHotkeysContext()

    useEffect(() => {
        enableScope(EKeyboardScope.dialog)
    }, [enableScope])

    useHotkey({
        key: 'Escape',
        callback: () => {
            disableScope(EKeyboardScope.dialog)
            closeCallback()
        },
        scopes: EKeyboardScope.dialog
    })

    return createPortal(<div
        data-testid="dialog"
        className="dialog dialog--active"
    >
        <div className="dialog__container">
            <div className="dialog__header">
                <div className="dialog__title">
                    {title}
                </div>
            </div>
            <div className="dialog__content-container">
                <div className="dialog__text">
                    {text}
                </div>
                {children ? <div className="dialog__content">
                    {children}
                </div> : null}
            </div>
            <div className="dialog__controls">
                {buttons.map((button, k) => <Button
                    {...button}
                    key={k}
                />)}
            </div>
        </div>
    </div>, document.body)
}
