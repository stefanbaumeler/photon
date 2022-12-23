import Layout from '@/layouts/layout'
import { Uploader, Details, Dialog, Media } from '@/components'
import { DetailsProvider } from '@/providers'
import { useQFavorites } from '@/api'

const ArchivePage = () => {
    const favorites = useQFavorites()

    if (favorites.loading) {
        return <></>
    }

    const media = favorites.data?.favorites

    return <Layout>
        <section>
            <div>
                <Dialog />
                <Uploader />
                <DetailsProvider>
                    <Details />
                    <Media media={media || []} />
                </DetailsProvider>
            </div>
        </section>
    </Layout>
}

export default ArchivePage
