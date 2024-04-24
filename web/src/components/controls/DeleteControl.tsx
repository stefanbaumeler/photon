import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { DeleteMediaDialog } from '@/components/dialogs/DeleteMediaDialog'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { DropdownItem } from '@/components/shared/Dropdown/components/DropdownItem'
import { Button } from '@/components/shared/Button'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'
import { getParentUrl } from '@/util/routing'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
    dropdown?: boolean
    callback?: () => void
    media: string[]
}

export const DeleteControl = ({
    dropdown, media, callback
}: Props) => {
    const selection = useSelectionContext()
    const [dialogActive, setDialogActive] = useState(false)
    const { medium } = useMediumFromRouter()
    const { t } = useTranslation()
    const router = useRouter()
    const pathname = usePathname()

    return <>
        {dialogActive ? <DeleteMediaDialog
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
            testId: 'trash-delete',
            label: t(ETrans.DELETE),
            callback: () => {
                setDialogActive(true)
                callback && callback()
            }
        }}
        /> : <Button
            label={t(ETrans.DELETE)}
            onClick={() => setDialogActive(true)}
            icon={Icons.mdiDeleteForever}
            testId="trash-delete"
            appearance={{
                type: 'tertiary',
                text: medium ? 'light' : undefined
            }}
        />}
    </>
}
