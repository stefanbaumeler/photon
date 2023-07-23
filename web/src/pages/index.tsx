import Layout from '../layouts/layout'
import { Details, Dialog, Media, Uploader } from '@/components'
import { useSearchContext } from '@/providers'
import { useEffect } from 'react'
import { EMediumStatus } from '@/types/app'

const HomePage = () => {
    const search = useSearchContext()

    useEffect(() => {
        search.setStatus(EMediumStatus.ALL)
        search.setFavorites(false)
    }, [search])

    return <Layout>
        <Dialog />
        <Uploader />
        <Details />
        <Media />
    </Layout>
}

export default HomePage
