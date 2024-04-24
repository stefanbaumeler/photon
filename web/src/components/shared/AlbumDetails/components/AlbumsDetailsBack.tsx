'use client'

import { Button } from '@/components/shared/Button'
import { ETrans } from '@/types/translations'
import * as Icons from '@mdi/js'
import { useTranslation } from 'react-i18next'
import { useHotkey } from '@/hooks/hotkey'
import { EKeyboardScope } from '@/types/app'
import { useRouter } from 'next/navigation'
import { useSelectionContext } from '@/providers/SelectionProvider'

export const AlbumsDetailsBack = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const selection = useSelectionContext()

    const back = () => {
        selection.clear()
        router.push('/albums')
    }

    useHotkey({
        key: 'Escape',
        callback: back,
        scopes: EKeyboardScope.album
    })

    return <div className="albums-details__back">
        <Button
            testId="album-back"
            hint={{
                label: t(ETrans.BACK),
                placement: 'right'
            }}
            icon={Icons.mdiArrowLeft}
            onClick={back}
        />
    </div>
}
