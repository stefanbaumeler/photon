import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { TMedium } from '@photon/schema'
import { useKeyboard, useSetMediaStatus } from '@/hooks'
import { EMediumStatus } from '@/types/app'
import { useDetailsContext, useSearchContext, useSelectionContext } from '@/providers'
import { useRouter } from 'next/router'

type Props = {
    media: TMedium[]
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

    const shouldArchive = Array.from(media)[0]?.status !== EMediumStatus.ARCHIVED

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

        if (shouldArchive) {
            search.setStatus(EMediumStatus.ARCHIVED)

            router.push('/archive', null, {
                shallow: true
            })
        }

        callback && callback()
    }
    useKeyboard('keyup', 'a', shortcut && action)

    const testId = shouldArchive ? 'archive' : 'unarchive'
    const label = t(shouldArchive ? ETrans.MOVE_TO_ARCHIVE : ETrans.UNARCHIVE)
    const icon = shouldArchive ? Icons.mdiArchiveOutline : Icons.mdiArchiveArrowUpOutline

    const ButtonOrDropdownItem = () => {
        if (dropdown) {
            return <DropdownItem item={{
                testId,
                label,
                callback: action,
                shortcut: shortcut && 'A'
            }}
            />
        }

        return <Button
            testId={testId}
            onClick={action}
            hint={label}
            shortcut={shortcut && 'A'}
            icon={icon}
            appearance={details.active && {
                text: 'light'
            }}
        />
    }

    return <ButtonOrDropdownItem />
}
