import Layout from '@/layouts/layout'
import { Uploader, Details } from '@/components'
import { DetailsProvider } from '@/providers'

const SecurityPage = () => {
    return <Layout>
        <section>
            <div>
                <Uploader />
                <DetailsProvider>
                    <Details />
                </DetailsProvider>
            </div>
        </section>
    </Layout>
}

export default SecurityPage
