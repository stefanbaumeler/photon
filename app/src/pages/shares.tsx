import Layout from '@/layouts/layout'
import { useMedia } from '@/api/hooks'
import { Media, Uploader, Details } from '@/components'
import { DetailsProvider } from '@/providers'

const SharesPage = () => {
    const { state: [{ media }] } = useMedia()

    return <Layout>
        <section>
            <div>
                <Uploader />
                <DetailsProvider>
                    <Details />
                    <Media media={media} />
                </DetailsProvider>
            </div>
        </section>
    </Layout>
}

export default SharesPage
