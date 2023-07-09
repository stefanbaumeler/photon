import Layout from '../layouts/layout'
import { Details, Dialog, Media, Uploader } from '@/components'
import { DetailsProvider, useSearchContext } from '@/providers'
import { useEffect } from 'react'
import { EMediumStatus } from '@/types/app'

const HomePage = () => {
    const search = useSearchContext()

    useEffect(() => {
        search.setStatus(EMediumStatus.ALL)
    }, [search])

    return <Layout>
        <Dialog />
        <Uploader />
        <DetailsProvider>
            <Details />
            <Media />
        </DetailsProvider>
    </Layout>
}

export default HomePage
