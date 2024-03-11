import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useDownload, useKeyboard } from '@/hooks'
import { useDetailsContext, useSelectionContext } from '@/providers'

type Props = {
    elements?: string[]
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const DownloadMediaControl = ({
    elements, dropdown, shortcut, callback
}: Props) => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const selection = useSelectionContext()
    const selectedMedia = elements ?? [...selection.selected]

    const actionCallback = () => {
        if (selection.selected.size) {
            selection.clear()
        }
    }

    const download = useDownload({
        elements: selectedMedia,
        callback: actionCallback
    })

    const action = () => {
        download()
        callback && callback()
    }

    useKeyboard('keyup', 'd', shortcut && action)

    return dropdown ? <DropdownItem item={{
        testId: 'download',
        label: t(ETrans.DOWNLOAD),
        callback: action,
        shortcut: shortcut && 'D'
    }}
    /> : <Button
        testId="download"
        hint={t(ETrans.DOWNLOAD)}
        shortcut={shortcut && 'D'}
        onClick={action}
        appearance={details.active && {
            text: 'light'
        }}
        icon={Icons.mdiTrayArrowDown}
    />
}
