import Layout from '@/layouts/layout'
import { Uploader, Details, Media, Dialog } from '@/components'
import { DetailsProvider } from '@/providers'
import { useMediaQuery } from '@/types/api'

const TrashPage = () => {
    const media = useMediaQuery({
        variables: {
            status: 'trash'
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
