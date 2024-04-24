'use client'

import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { ChangePasswordDialog } from '@/components/dialogs/ChangePasswordDialog'
import { Heading } from '@/components/shared/Heading'
import { Setting } from '@/components/shared/Setting'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { Button } from '@/components/shared/Button'

const SettingsPage = () => {
    const { t } = useTranslation()
    const [dialogActive, setDialogActive] = useState(false)
    return <>
        {dialogActive ? <ChangePasswordDialog
            closeCallback={() => {
                setDialogActive(false)
            }}
        /> : null}
        <div className="page">
            <Heading
                level={1}
                text={'Settings'}
            />
            <Setting
                title={t(ETrans.LANGUAGE)}
                description={'Language'}
            >
                <LanguageSwitcher />
            </Setting>
            <Setting
                title={'Automatically clear trash'}
                description={'Permanently remove media from your trashcan once it has been there for a while.'}
            >
            </Setting>
            <Setting title={t(ETrans.PASSWORD)}>
                <Button
                    appearance={{
                        type: 'secondary',
                        size: 'small'
                    }}
                    label={t(ETrans.CHANGE_PASSWORD)}
                    onClick={() => setDialogActive(true)}
                />
            </Setting>
            <Setting title={'2FA'}>
            </Setting>
            <Setting title={'Delete account'}>
                <Button
                    appearance={{
                        type: 'danger',
                        size: 'small'
                    }}
                    label={'Delete Account'}
                />
            </Setting>
            <ul>
                <li>
                            Default view
                </li>
            </ul>
        </div>
    </>
}

export default SettingsPage
