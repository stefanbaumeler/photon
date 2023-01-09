import Layout from '../layouts/layout'
import { Uploader, Details, Dialog, Media } from '../components'
import { DetailsProvider } from '../providers'

const FavoritesPage = () => {
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

export default FavoritesPage
