import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useSignOut } from '@/hooks'
import { useQProfile } from '@photon/schema'

type Props = {
    children: ReactNode
}

const AuthGuard = ({ children }: Props) => {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(true)
    const signOut = useSignOut()

    const [{
        data: user, fetching
    }] = useQProfile()

    useEffect(() => {
        const authCheck = (url: string) => {
            const publicPaths = ['/login', '/']
            const path = url.split('?')[0]

            if (!user?.profile && !fetching && !publicPaths.includes(path)) {
                setAuthorized(false)
                signOut()
            } else {
                setAuthorized(true)
            }
        }

        authCheck(router.asPath)

        router.events.on('routeChangeComplete', authCheck)

        return () => {
            router.events.off('routeChangeComplete', authCheck)
        }
    }, [signOut, router, user, fetching])

    return authorized && children
}

export default AuthGuard
