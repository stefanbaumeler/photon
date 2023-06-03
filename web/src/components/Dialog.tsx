import useKeyboard from '@/hooks/keyboard'
import { useDialogContext } from '@/providers'
import bem from '@/util/bem'
import { Button } from '@/components'

export const Dialog = () => {
    const dialog = useDialogContext()

    useKeyboard('keydown', 'Escape', () => {
        dialog.close()
    }, [])
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
                {dialog.buttons.map((button, k) => <Button
                    {...button}
                    key={k}
                />)}
            </div>
        </div>
    </div>
}
