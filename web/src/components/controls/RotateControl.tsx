import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useHotkey } from '@/hooks/hotkey'
import { DropdownItem } from '@/components/shared/Dropdown/components/DropdownItem'
import { Button } from '@/components/shared/Button'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'
import { useRotationContext } from '@/providers/RotationProvider'

type Props = {
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const RotateControl = ({
    dropdown, shortcut, callback
}: Props) => {
    const { t } = useTranslation()
    const { medium } = useMediumFromRouter()
    const { rotate } = useRotationContext()
    const action = () => {
        if (medium?.id) {
            rotate(medium.id)
        }
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
        appearance={medium ? {
            text: 'light'
        } : undefined}
        icon={Icons.mdiRotateLeft}
    />
}
