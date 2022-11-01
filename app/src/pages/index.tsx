import Layout from '@/layouts/layout'
import { Media, Uploader, Details, Dialog } from '@/components'
import { DetailsProvider } from '@/providers'
import { useMediaQuery } from '@/types/api'
import { EMediumStatus } from '@/types/app'

const HomePage = () => {
    const media = useMediaQuery({
        variables: {
            status: EMediumStatus.DEFAULT
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

export default HomePage
