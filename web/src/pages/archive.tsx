import Layout from '../layouts/layout'
import { Details, Dialog, Media, Uploader } from '@/components'
import { DetailsProvider, useSearchContext } from '@/providers'
import { useEffect } from 'react'
import { EMediumStatus } from '@/types/app'

const ArchivePage = () => {
    const search = useSearchContext()

    useEffect(() => {
        search.setStatus(EMediumStatus.ARCHIVED)
        search.setFavorites(false)
    })

    return <Layout>
        <section>
            <div>
                <Dialog />
                <Uploader />
                <Details />
                <Media />
            </div>
        </section>
    </Layout>
}

export default ArchivePage
