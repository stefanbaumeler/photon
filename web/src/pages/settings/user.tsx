import Layout from '../../layouts/layout'
import { Uploader, Details } from 'web/src/components'
import { DetailsProvider } from 'web/src/providers'

const UserPage = () => {
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

export default UserPage
