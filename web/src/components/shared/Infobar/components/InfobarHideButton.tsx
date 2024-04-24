'use client'

import * as Icons from '@mdi/js'
import { Button } from '@/components/shared/Button'
import { useInfobarContext } from '@/components/shared/Infobar/components/InfobarProvider'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'

export const InfobarHideButton = () => {
    const infobar = useInfobarContext()
    console.log(infobar.infobarVisible)
    const { t } = useTranslation()

    return <Button
        testId="hide-infos"
        hint={t(ETrans.HIDE_THING, {
            thing: t(ETrans.INFO_PLURAL)
        })}
        onClick={infobar.hideInfobar}
        icon={Icons.mdiArrowRight}
    />
}
