import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { TAlbum, TMedium } from '@photon/schema'
import { useKeyboard } from '@/hooks/keyboard'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { useRouter } from 'next/router'
import { isMedium } from '@/util/is'
import useDownload from '@/hooks/download'

type Props = {
    elements: (TMedium | TAlbum)[]
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const DownloadControl = ({
    elements, dropdown, shortcut, callback
}: Props) => {
    const router = useRouter()
    const { t } = useTranslation()
    const details = useDetailsContext()
    const selection = useSelectionContext()

    const actionCallback = () => {
        if (selection.selected.size) {
            selection.clear()
        }
    }

    const download = useDownload({
        elements,
        callback: actionCallback
    })

    const action = () => {
        if (elements.length === 1 && isMedium(elements[0])) {
            const src = elements[0].filenameDisk ? `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${elements[0].filenameDisk}` : '#'
            router.push(`${src}?download=true`)
        }
        else {
            download()
        }

        callback && callback()
    }

    useKeyboard('keyup', 'd', shortcut && action)

    if (dropdown) {
        return <DropdownItem item={{
            testId: 'download',
            label: t(ETrans.DOWNLOAD),
            callback: action,
            shortcut: shortcut && 'D'
        }}
        />
    }

    return <Button
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
