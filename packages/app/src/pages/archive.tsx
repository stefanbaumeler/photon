import Layout from '@/layouts/layout'
import { Details, Dialog, Media, Uploader } from '@/components'
import { DetailsProvider } from '@/providers'

const ArchivePage = () => {
    return <Layout>
        <section>
            <div>
                <Dialog />
                <Uploader />
                <DetailsProvider>
                    <Details />
                    <Media />
                </DetailsProvider>
            </div>
        </section>
    </Layout>
}

export default ArchivePage
