import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useMChangePassword, useQProfile } from '@photon/schema/dist/client'
import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { Dialog } from '@/components/shared/Dialog'
import { TextBox } from '@/components/shared/TextBox'

type Props = {
    closeCallback: () => void
}

export const ChangePasswordDialog = ({ closeCallback }: Props) => {
    const [changedPassword, setChangedPassword] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [, changePasswordMutation] = useMChangePassword()
    const [{ data: user }] = useQProfile()
    const { t } = useTranslation()

    const submit = () => {
        if (user) {
            changePasswordMutation({
                currentPassword,
                newPassword,
                mail: user.profile.email
            }).then(() => {
                setChangedPassword(true)
            })
        }
    }

    const close = () => {
        setChangedPassword(false)
        setCurrentPassword('')
        setNewPassword('')
        setRepeatNewPassword('')
        closeCallback()
    }

    return changedPassword ? <Dialog
        closeCallback={close}
        title="Password reset complete"
        buttons={[
            {
                label: t(ETrans.CLOSE),
                onClick: close,
                appearance: {
                    type: 'secondary'
                }
            }
        ]}
    >
        <Icon
            className="dialog__success"
            path={Icons.mdiCheckboxMarkedCircleOutline}
        />
    </Dialog> : <Dialog
        title={t(ETrans.CHANGE_PASSWORD)}
        closeCallback={close}
        buttons={[
            {
                testId: 'change-password-confirm',
                label: t(ETrans.SAVE),
                onClick: submit
            },
            {
                label: t(ETrans.CANCEL),
                onClick: close,
                appearance: {
                    type: 'secondary'
                }
            }
        ]}
    >
        <TextBox
            id="current-password"
            label={t(ETrans.CURRENT_PASSWORD)}
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
        />
        <TextBox
            id="new-password"
            label={t(ETrans.NEW_PASSWORD)}
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
        />
        <TextBox
            id="new-password-repeat"
            label={t(ETrans.REPEAT_NEW_PASSWORD)}
            type="password"
            value={repeatNewPassword}
            onChange={(event) => setRepeatNewPassword(event.target.value)}
        />
    </Dialog>
}
