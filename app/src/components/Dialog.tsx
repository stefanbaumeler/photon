import { useContext } from 'react'
import { DialogContext } from '@/contexts'
import { TDialogButton } from '@/types/app'

const Dialog = () => {
    const {
        text, buttons, active
    } = useContext(DialogContext)

    const DialogButton = (btn: TDialogButton) => {
        return <button
            className={`dialog__button dialog__button--${btn.type || 'primary'}`}
            onClick={btn.action}
        >
            {btn.label}
        </button>
    }

    return <div className={`dialog${active ? ' dialog--active' : ''}`}>
        <div className="dialog__content">
            <div className="dialog__text">
                {text}
            </div>
            <div className="dialog__controls">
                {buttons.map((button, k) => <DialogButton
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
