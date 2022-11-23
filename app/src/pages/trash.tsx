import Layout from '@/layouts/layout'
import { Uploader, Details, Dialog, Media } from '@/components'
import { DetailsProvider } from '@/providers'
import { useMediaQuery } from '@photon/shared'
import { EMediumStatus } from '@/types/app'

const TrashPage = () => {
    const media = useMediaQuery({
        variables: {
            status: EMediumStatus.TRASH
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

export default TrashPage
