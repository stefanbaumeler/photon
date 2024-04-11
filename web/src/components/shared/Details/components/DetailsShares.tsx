import { useDetailsContext } from '@/providers'
import { Detail } from '@/components'
import * as Icons from '@mdi/js'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { DetailsSection } from '..'

export const DetailsShares = () => {
    const details = useDetailsContext()
    const { t } = useTranslation()

    return <DetailsSection title={t(ETrans.SHARED_WITH)}>
        <Detail
            icon={Icons.mdiAccountOutline}
            title={`${details.medium.owner.firstName} ${details.medium.owner.lastName}`}
        />
    </DetailsSection>
}
