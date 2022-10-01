import Layout from '@/layouts/layout'
import { useMedia } from '@/api/hooks'
import { Media, Uploader, Details } from '@/components'
import { DetailsProvider } from '@/providers'

const ApiPage = () => {
    const media = useMedia()

    return <Layout>
        <section>
            <div>
                <Uploader />
                <DetailsProvider>
                    <Details />
                    <Media media={media.state} />
                </DetailsProvider>
            </div>
        </section>
    </Layout>
}

export default ApiPage
