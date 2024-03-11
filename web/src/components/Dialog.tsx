import { useKeyboard } from '@/hooks'
import bem from '@/util/bem'
import { Button } from '@/components'
import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useKeyboardContext } from '@/providers'

type Props = {
    id: string
    title?: string
    text?: string
    buttons?: (Parameters<typeof Button>[0])[]
    children?: ReactNode
    active?: boolean
    closeCallback: () => void
}
export const Dialog = ({
    id, active, title, children, buttons = [], text, closeCallback
}: Props) => {
    const [isSSR, setIsSSR] = useState(true)

    useEffect(() => {
        setIsSSR(false)
    }, [])

    const { setIsTyping } = useKeyboardContext()
    useKeyboard('keydown', 'Escape', () => {
        if (active) {
            closeCallback()
        }
    })

    useEffect(() => {
        setIsTyping(active)
    }, [active, setIsTyping])

    const classes = bem('dialog', [
        ['active', active]
    ])

    if (isSSR) {
        return null
    }

    return active ? createPortal(<div
        data-testid={id}
        className={classes}
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
    </div>, document.body) : null
}
