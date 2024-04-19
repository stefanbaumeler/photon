import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useSetMediaStatus } from '@/hooks'
import { EMediumStatus } from '@/types/app'
import { useDetailsContext, useSearchContext, useSelectionContext } from '@/providers'
import { useRouter } from 'next/router'
import { useHotkey } from '@/hooks/hotkey'

type Props = {
    media: string[]
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const ArchiveControl = ({
    media, dropdown, shortcut, callback
}: Props) => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const selection = useSelectionContext()
    const search = useSearchContext()
    const router = useRouter()

    const first = search.hits.find((medium) => medium.id === media[0])

    const shouldArchive = first?.status !== EMediumStatus.ARCHIVED

    const archive = useSetMediaStatus({
        media,
        status: EMediumStatus.ARCHIVED
    })

    const unarchive = useSetMediaStatus({
        media,
        status: EMediumStatus.ALL
    })

    const action = async () => {
        if (shouldArchive) {
            await archive()
        } else {
            await unarchive()
        }

        if (selection.selected.size) {
            selection.clear()
        }

        if (details.active) {
            await details.close()
        }

        if (shouldArchive) {
            search.setStatus(EMediumStatus.ARCHIVED)

            await router.push('/archive', undefined, {
                shallow: true
            })
        }

        callback && callback()
    }

    useHotkey({
        key: 'a',
        callback: action,
        condition: !!shortcut
    })

    const testId = shouldArchive ? 'archive' : 'unarchive'
    const label = t(shouldArchive ? ETrans.MOVE_TO_ARCHIVE : ETrans.UNARCHIVE)
    const icon = shouldArchive ? Icons.mdiArchiveOutline : Icons.mdiArchiveArrowUpOutline

    return dropdown ? <DropdownItem item={{
        testId,
        label,
        callback: action,
        shortcut: shortcut ? 'A' : undefined
    }}
    /> : <Button
        testId={testId}
        onClick={action}
        hint={label}
        shortcut={shortcut ? 'A' : undefined}
        icon={icon}
        appearance={details.active ? {
            text: 'light'
        } : undefined}
    />
}
