import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useMSignOut } from '@photon/schema'
import { useRouter } from 'next/router'

type Props = {
    dropdown?: boolean
    callback?: () => void
}

export const SignOutControl = ({
    dropdown, callback
}: Props) => {
    const { t } = useTranslation()
    const [, out] = useMSignOut()
    const router = useRouter()

    const action = () => {
        out({}).then(() => {
            window.localStorage.removeItem('photon')
            router.push('/login')
        })
        callback && callback()
    }

    if (dropdown) {
        return <DropdownItem item={{
            label: t(ETrans.SIGN_OUT),
            callback: action
        }}
        />
    }

    return <Button
        hint={t(ETrans.SIGN_OUT)}
        icon={Icons.mdiLogout}
        onClick={action}
    />
}
