import AppLayout from '@/layouts/app-layout'
import HomeLayout from '@/layouts/home-layout'
import { Details, Dialog, Media, Uploader } from '@/components'
import { useSearchContext, useUserContext } from '@/providers'
import { useEffect } from 'react'
import { EMediumStatus } from '@/types/app'

const HomePage = () => {
    const search = useSearchContext()
    const {
        unauthenticated, user
    } = useUserContext()

    useEffect(() => {
        search.setStatus(EMediumStatus.ALL)
        search.setFavorites(false)
    }, [search])

    if (!user) {
        if (unauthenticated) {
            return <HomeLayout>
                Home
            </HomeLayout>
        }

        return <></>
    }

    return <AppLayout>
        <Dialog />
        <Uploader />
        <Details />
        <Media />
    </AppLayout>
}

export default HomePage
