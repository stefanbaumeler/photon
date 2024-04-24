'use client'

import * as Icons from '@mdi/js'
import { Button } from '@/components/shared/Button'
import { getParentUrl } from '@/util/routing'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { useHotkey } from '@/hooks/hotkey'

type Props = {
    album?: string
}
export const DetailsBackButton = ({ album }: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    const parent = getParentUrl(pathname, album)
    const { t } = useTranslation()

    useHotkey({
        key: 'Escape',
        callback: () => {
            router.push(parent)
        }
    })

    return <Button
        href={parent}
        testId="close-details"
        hint={t(ETrans.BACK)}
        appearance={{
            text: 'light'
        }}
        icon={Icons.mdiArrowLeft}
    />
}
