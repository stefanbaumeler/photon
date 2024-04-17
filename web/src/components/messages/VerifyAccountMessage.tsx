import { Button, Message } from '@/components'
import { useTranslation } from 'react-i18next'

export const VerifyAccountMessage = () => {
    const { t } = useTranslation()
    return <Message
        fixed
        danger
    >
        {t('VERIFY ACCOUNT')}
        <Button
            appearance={{
                size: 'small'
            }}
            onClick={() => {}}
            label={t('RESEND EMAIL')}
        />
    </Message>
}
