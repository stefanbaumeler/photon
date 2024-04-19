import { useEffect, useState } from 'react'
import { TextBox } from '@/components'
import { ETrans } from '@/types/translations'
import { useMChangePassword, useQProfile } from '@photon/schema'
import { useTranslation } from 'react-i18next'

type Props = {
    submit: boolean
    callback?: () => void
}
export const ChangePasswordFields = ({
    submit, callback
}: Props) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [, changePasswordMutation] = useMChangePassword()
    const [{ data: user }] = useQProfile()
    const { t } = useTranslation()

    useEffect(() => {
        if (submit && user) {
            changePasswordMutation({
                currentPassword,
                newPassword,
                mail: user.profile.mail
            }).then(() => {
                callback && callback()
            })
        }
    }, [changePasswordMutation, submit, callback, currentPassword, newPassword, user])

    return <>
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
    </>
}
