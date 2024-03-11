import { ENavs } from '@/types/app'
import { useMSignOut } from '@photon/schema'
import { useNavContext } from '@/providers'
import { useRouter } from 'next/router'

export const useSignOut = () => {
    const [, out] = useMSignOut()
    const { setActive: setActiveNavigation } = useNavContext()
    const router = useRouter()

    return () => {
        out({}).then(() => {
            window.localStorage.removeItem('photon')
            setActiveNavigation([ENavs.HOME])
            router.push('/login')
        })
    }
}
