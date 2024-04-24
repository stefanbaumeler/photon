import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { RestoreMediaDialog } from '@/components/dialogs/RestoreMediaDialog'
import { DropdownItem } from '@/components/shared/Dropdown/components/DropdownItem'
import { Button } from '@/components/shared/Button'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'
import { usePathname, useRouter } from 'next/navigation'
import { getParentUrl } from '@/util/routing'

type Props = {
    dropdown?: boolean
    callback?: () => void
    media: string[]
}

export const RestoreControl = ({
    dropdown, media, callback
}: Props) => {
    const selection = useSelectionContext()
    const [dialogActive, setDialogActive] = useState(false)
    const { medium } = useMediumFromRouter()
    const router = useRouter()
    const pathname = usePathname()

    const { t } = useTranslation()

    return <>
        {dialogActive ? <RestoreMediaDialog
            media={media}
            closeCallback={(actionTaken) => {
                setDialogActive(false)
                if (actionTaken) {
                    router.push(getParentUrl(pathname))
                    selection.clear()
                    callback && callback()
                }
            }}
        /> : null}
        {dropdown ? <DropdownItem item={{
            testId: 'trash-restore',
            label: t(ETrans.RESTORE),
            callback: () => {
                setDialogActive(true)
                callback && callback()
            }
        }}
        /> : <Button
            label={t(ETrans.RESTORE)}
            onClick={() => {
                setDialogActive(true)
                callback && callback()
            }}
            icon={Icons.mdiDeleteRestore}
            testId="trash-restore"
            appearance={{
                type: 'tertiary',
                text: medium ? 'light' : undefined
            }}
        />}
    </>
}
