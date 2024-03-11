import Layout from '@/layouts/app-layout'
import { Uploader, Details, Dialog, Media } from '@/components'
import { useSearchContext } from '@/providers'
import { useEffect } from 'react'
import { EMediumStatus } from '@/types/app'

const FavoritesPage = () => {
    const search = useSearchContext()

    useEffect(() => {
        search.setStatus(EMediumStatus.ALL)
        search.setFavorites(true)
    }, [search])

    return <Layout>
        <section>
            <div>
                <Uploader />
                <Details />
                <Media />
            </div>
        </section>
    </Layout>
}

export default FavoritesPage
