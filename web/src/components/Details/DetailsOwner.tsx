import { useDetailsContext } from 'web/src/providers'
import { Detail } from 'web/src/components'
import * as Icons from '@mdi/js'
import { useTranslation } from 'react-i18next'
import { ETrans } from 'web/src/types/translations'
import { DetailsSection } from './DetailsSection'

export const DetailsOwner = () => {
    const details = useDetailsContext()
    const { t } = useTranslation()

    return <DetailsSection title={t(ETrans.OWNED_BY)}>
        <Detail
            icon={Icons.mdiAccountOutline}
            title={`${details.medium.owner.firstName} ${details.medium.owner.lastName}`}
        />
    </DetailsSection>
}
