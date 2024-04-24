import { ENavs } from '@/types/app'
import { useMSignOut } from '@photon/schema/dist/client'
import { useRouter } from 'next/navigation'
import { useNavContext } from '@/providers/NavProvider'

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
