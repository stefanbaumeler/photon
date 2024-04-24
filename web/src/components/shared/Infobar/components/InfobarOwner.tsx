'use client'

import * as Icons from '@mdi/js'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'
import { Detail } from '@/components/shared/Detail'
import { InfobarSection } from '@/components/shared/Infobar/components/InfobarSection'

export const InfobarOwner = () => {
    const { t } = useTranslation()
    const { medium } = useMediumFromRouter()

    const title = medium ? `${medium.owner.firstName} ${medium.owner.lastName}` : ''

    return <InfobarSection title={t(ETrans.OWNED_BY)}>
        <Detail
            icon={Icons.mdiAccountOutline}
            title={title}
            testId="owner-detail"
        />
    </InfobarSection>
}
