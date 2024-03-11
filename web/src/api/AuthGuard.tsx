import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/providers'
import { useSignOut } from '@/hooks/sign-out'

type Props = {
    children: ReactNode
}

const AuthGuard = ({ children }: Props) => {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(true)
    const signOut = useSignOut()

    const {
        user, fetching
    } = useUserContext()

    useEffect(() => {
        const authCheck = (url: string) => {
            const publicPaths = ['/login', '/']
            const path = url.split('?')[0]

            if (!user && !fetching && !publicPaths.includes(path)) {
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
