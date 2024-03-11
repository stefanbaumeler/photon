import { Dialog, TextBox } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useMChangePassword } from '@photon/schema'
import { useUserContext } from '@/providers'
import Icon from '@mdi/react'
import * as Icons from '@mdi/js'

type Props = {
    active: boolean
    closeCallback: () => void
}

export const ChangePasswordDialog = ({
    active, closeCallback
}: Props) => {
    const [changedPassword, setChangedPassword] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [, changePasswordMutation] = useMChangePassword()
    const { user } = useUserContext()
    const { t } = useTranslation()

    const submit = () => {
        changePasswordMutation({
            currentPassword,
            newPassword,
            mail: user.mail
        }).then(() => {
            setChangedPassword(true)
        })
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
        active={active}
        id={'change-password-complete'}
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
        active={active}
        id={'change-password'}
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
