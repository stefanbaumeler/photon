import { useContext, useEffect } from 'react'
import { DialogContext } from '@/providers'
import { TDialogButton } from '@/types/app'

const Dialog = () => {
    const dialog = useContext(DialogContext)

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                dialog.close()
            }
        }

        window.addEventListener('keydown', keydown)

        return () => {
            window.removeEventListener('keydown', keydown)
        }
    }, [])

    const DialogButton = (btn: TDialogButton) => {
        return <button
            className={`dialog__button dialog__button--${btn.type || 'primary'}`}
            onClick={btn.action}
        >
            {btn.label}
        </button>
    }

    const DialogContent = () => {
        if (!dialog.content) {
            return <></>
        }

        return <div className="dialog__content">
            {dialog.content}
        </div>
    }

    return <div className={`dialog${dialog.active ? ' dialog--active' : ''}`}>
        <div className="dialog__container">
            <div className="dialog__header">
                <div className="dialog__title">
                    {dialog.title}
                </div>
            </div>
            <div className="dialog__content-container">
                <div className="dialog__text">
                    {dialog.text}
                </div>
                <DialogContent />
            </div>
            <div className="dialog__controls">
                {dialog.buttons.map((button, k) => <DialogButton
                    key={k}
                    label={button.label}
                    action={button.action}
                    type={button.type}
                />)}
            </div>
        </div>
    </div>
}

export default Dialog
