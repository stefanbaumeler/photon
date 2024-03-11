import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useSignOut } from '@/hooks/sign-out'

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
