import Layout from '@/layouts/layout'
import { Media, Uploader, Details, Dialog } from '@/components'
import { DetailsProvider } from '@/providers'
import { useMediaQuery } from '@/types/api'

const HomePage = () => {
    const media = useMediaQuery()

    if (media.loading) {
        return <></>
    }

    console.log(media.data?.media)

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
