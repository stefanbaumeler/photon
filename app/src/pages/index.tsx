import Layout from '@/layouts/layout'
import { useMedia } from '@/api/hooks'
import { Media, Uploader, Details, Dialog } from '@/components'
import { DetailsProvider } from '@/providers'

const HomePage = () => {
    const media = useMedia()
    return <Layout>
        <section>
            <div>
                <Dialog />
                <Uploader />
                <DetailsProvider>
                    <Details />
                    <Media media={media.state} />
                </DetailsProvider>
            </div>
        </section>
    </Layout>
}

export default HomePage
