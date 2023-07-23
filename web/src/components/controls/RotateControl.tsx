import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { TMedium } from '@photon/schema'
import { useKeyboard } from '@/hooks/keyboard'
import useRotate from '@/hooks/rotate'
import { useDetailsContext } from '@/providers'

type Props = {
    media: TMedium[]
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const RotateControl = ({
    media, dropdown, shortcut, callback
}: Props) => {
    const { t } = useTranslation()
    const details = useDetailsContext()

    const rotate = useRotate(media[0])

    const action = () => {
        rotate()
        callback && callback()
    }

    useKeyboard('keyup', 'r', shortcut && action)

    if (dropdown) {
        return <DropdownItem item={{
            testId: 'rotate',
            label: t(ETrans.ROTATE_CLOCKWISE),
            callback: action,
            shortcut: shortcut && 'R'
        }}
        />
    }

    return <Button
        testId="rotate"
        hint={t(ETrans.ROTATE_CLOCKWISE)}
        shortcut={shortcut && 'R'}
        onClick={action}
        appearance={details.active && {
            text: 'light'
        }}
        icon={Icons.mdiRotateLeft}
    />
}
