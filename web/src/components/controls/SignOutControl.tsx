import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useMSignOut } from '@photon/schema'
import { useRouter } from 'next/router'
import { useNavContext } from '@/providers'
import { ENavs } from '@/types/app'

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
    const { setActive: setActiveNavigation } = useNavContext()

    const action = () => {
        out({}).then(() => {
            window.localStorage.removeItem('photon')
            setActiveNavigation([ENavs.HOME])
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
