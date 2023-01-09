import { useDialogContext } from '@/providers'
import { TDialogButton } from '@/types/app'
import useKeyboard from '@/hooks/keyboard'
import bem from '@/util/bem'

export const Dialog = () => {
    const dialog = useDialogContext()

    useKeyboard('keydown', 'Escape', () => {
        dialog.close()
    }, [])

    const DialogButton = (btn: TDialogButton) => {
        const classes = bem('dialog__button', [[btn.type || 'primary']])

        return <button
            className={classes}
            onClick={btn.action}
            data-testid={btn.testId}
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

    const classes = bem('dialog', [
        ['active', dialog.active]
    ])

    return <div
        data-testid={dialog.id}
        className={classes}
    >
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
                    testId={button.testId}
                />)}
            </div>
        </div>
    </div>
}
