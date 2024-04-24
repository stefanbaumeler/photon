import { useTranslation } from 'react-i18next'
import { Message } from '@/components/shared/Message'
import { Button } from '@/components/shared/Button'

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
