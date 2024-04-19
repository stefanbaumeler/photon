import { Detail } from '@/components'
import * as Icons from '@mdi/js'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { DetailsSection } from '..'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

export const DetailsOwner = () => {
    const { t } = useTranslation()
    const { medium } = useMediumFromRouter()

    const title = medium ? `${medium.owner.firstName} ${medium.owner.lastName}` : ''

    return <DetailsSection title={t(ETrans.OWNED_BY)}>
        <Detail
            icon={Icons.mdiAccountOutline}
            title={title}
            testId="owner-detail"
        />
    </DetailsSection>
}
