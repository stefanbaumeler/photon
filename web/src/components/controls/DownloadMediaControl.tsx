import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useHotkey } from '@/hooks/hotkey'
import { EKeyboardScope } from '@/types/app'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useDownload } from '@/hooks/download'
import { DropdownItem } from '@/components/shared/Dropdown/components/DropdownItem'
import { Button } from '@/components/shared/Button'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

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
    const selection = useSelectionContext()
    const selectedMedia = elements ?? [...selection.selected]
    const { medium } = useMediumFromRouter()

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

    useHotkey({
        key: 'd',
        callback: action,
        scopes: EKeyboardScope.select,
        condition: !!shortcut
    })

    return dropdown ? <DropdownItem item={{
        testId: 'download',
        label: t(ETrans.DOWNLOAD),
        callback: action,
        shortcut: shortcut ? 'D' : undefined
    }}
    /> : <Button
        testId="download"
        hint={t(ETrans.DOWNLOAD)}
        shortcut={shortcut ? 'D' : undefined}
        onClick={action}
        appearance={medium ? {
            text: 'light'
        } : undefined}
        icon={Icons.mdiTrayArrowDown}
    />
}
