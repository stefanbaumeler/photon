import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/providers'

type Props = {
    children: ReactNode
}

const AuthGuard = ({ children }: Props) => {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(true)
    const {
        user, fetching
    } = useUserContext()

    useEffect(() => {
        authCheck(router.asPath)
        router.events.on('routeChangeComplete', authCheck)

        return () => {
            router.events.off('routeChangeComplete', authCheck)
        }
    }, [])

    const authCheck = (url: string) => {
        const publicPaths = ['/login', '/']
        const path = url.split('?')[0]

        if (!user && !fetching && !publicPaths.includes(path)) {console.log('bar')
            setAuthorized(false)
            router.push({
                pathname: '/login',
                query: {
                    returnUrl: router.asPath
                }
            })
        } else {
            setAuthorized(true)
        }
    }

    return authorized && children
}

export default AuthGuard
