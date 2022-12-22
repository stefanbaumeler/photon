import Layout from '@/layouts/layout'
import { Uploader, Details, Dialog, Media } from '@/components'
import { DetailsProvider } from '@/providers'
import { useQMedia } from '@/api'
import { EMediumStatus } from '@/types/app'

const HomePage = () => {
    const media = useQMedia({
        variables: {
            status: EMediumStatus.DEFAULT
        }
    })

    console.log(media)

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

export default HomePage
