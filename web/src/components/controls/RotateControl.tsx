import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useDetailsContext } from '@/providers'
import { useHotkey } from '@/hooks/hotkey'

type Props = {
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const RotateControl = ({
    dropdown, shortcut, callback
}: Props) => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const action = () => {
        details.rotate()
        callback && callback()
    }

    useHotkey({
        key: 'r',
        callback: action,
        condition: !!shortcut
    })

    return dropdown ? <DropdownItem item={{
        testId: 'rotate',
        label: t(ETrans.ROTATE_CLOCKWISE),
        callback: action,
        shortcut: shortcut ? 'R' : undefined
    }}
    /> : <Button
        testId="rotate"
        hint={t(ETrans.ROTATE_CLOCKWISE)}
        shortcut={shortcut ? 'R' : undefined}
        onClick={action}
        appearance={details.active ? {
            text: 'light'
        } : undefined}
        icon={Icons.mdiRotateLeft}
    />
}
