import Layout from '@/layouts/layout'
import { Uploader, Setting, LanguageSwitcher, Heading, Button } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'

const SettingsPage = () => {
    const { t } = useTranslation()

    return <Layout>
        <Uploader />
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
                            Trash deletion offset
                </li>
                <li>
                            Language
                </li>
                <li>
                            Default view
                </li>
                <li>
                            Delete account
                </li>
            </ul>
        </div>
    </Layout>
}

export default SettingsPage
