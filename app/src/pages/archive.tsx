import Layout from '@/layouts/layout'
import { Uploader, Details, Dialog, Media } from '@/components'
import { DetailsProvider } from '@/providers'
import { useQMedia } from '@photon/shared'
import { EMediumStatus } from '@/types/app'

const ArchivePage = () => {
    const media = useQMedia({
        variables: {
            status: EMediumStatus.ARCHIVED
        }
    })

    if (media.loading) {
        return <></>
    }

    return <Layout>
        <section>
            <div>
                <Dialog />
                <Uploader />
                <DetailsProvider>
                    <Details />
                    <Media media={media.data?.media || []} />
                </DetailsProvider>
            </div>
        </section>
    </Layout>
}

export default ArchivePage
