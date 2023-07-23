import Layout from '../layouts/layout'
import { Details, Dialog, Media, Uploader } from '@/components'
import { useSearchContext } from '@/providers'
import { useEffect } from 'react'
import { EMediumStatus } from '@/types/app'

const TrashPage = () => {
    const search = useSearchContext()

    useEffect(() => {
        search.setStatus(EMediumStatus.TRASH)
        search.setFavorites(false)
    }, [search])

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

export default TrashPage
