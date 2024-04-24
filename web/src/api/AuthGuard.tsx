'use client'

import { useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useQProfile } from '@photon/schema/dist/client'
import { useSignOut } from '@/hooks/useSignOut'

type Props = {
    children: ReactNode
}

const AuthGuard = ({ children }: Props) => {
    const [authorized, setAuthorized] = useState(true)
    const signOut = useSignOut()
    const pathname = usePathname()

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

        if (pathname) {
            authCheck(pathname)
        }

        // router.events.on('routeChangeComplete', authCheck)
        //
        // return () => {
        //     router.events.off('routeChangeComplete', authCheck)
        // }
    }, [signOut, pathname, user, fetching])

    return authorized && children
}

export default AuthGuard
