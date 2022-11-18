import Layout from '@/layouts/layout'
import { Uploader, Details, GalleryView, Dialog, Media } from '@/components'
import { DetailsProvider } from '@/providers'
import { useMediaQuery } from '@/types/api'
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
