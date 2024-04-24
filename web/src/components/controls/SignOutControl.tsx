import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { DropdownItem } from '@/components/shared/Dropdown/components/DropdownItem'
import { useSignOut } from '@/hooks/useSignOut'
import { Button } from '@/components/shared/Button'

type Props = {
    dropdown?: boolean
    callback?: () => void
}

export const SignOutControl = ({ dropdown }: Props) => {
    const { t } = useTranslation()
    const action = useSignOut()

    return dropdown ? <DropdownItem item={{
        label: t(ETrans.SIGN_OUT),
        callback: action
    }}
    /> : <Button
        hint={t(ETrans.SIGN_OUT)}
        icon={Icons.mdiLogout}
        onClick={action}
    />
}
