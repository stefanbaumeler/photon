import AppLayout from '@/layouts/app-layout'
import HomeLayout from '@/layouts/home-layout'
import { Media, Uploader } from '@/components'
import { useSearchContext } from '@/providers'
import { useEffect, useState } from 'react'
import { EMediumStatus } from '@/types/app'
import { useQProfile } from '@photon/schema'

const HomePage = () => {
    const search = useSearchContext()
    const [{ data: user }] = useQProfile()
    const [unauthenticated, setUnauthenticated] = useState(false)

    useEffect(() => {
        search.setStatus(EMediumStatus.ALL)
        search.setFavorites(false)
    }, [search])

    useEffect(() => {
        if (!window.localStorage.photon) {
            setUnauthenticated(true)
        }
    }, [])

    if (!user) {
        if (unauthenticated) {
            return <HomeLayout>
                Home
            </HomeLayout>
        }

        return null
    }

    return <AppLayout>
        <Uploader />
        <Media />
    </AppLayout>
}

export default HomePage
