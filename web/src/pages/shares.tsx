import Layout from '../layouts/layout'
import { Uploader, Details } from '@/components'

const SharesPage = () => {
    return <Layout>
        <section>
            <div>
                <Uploader />
                <Details />
            </div>
        </section>
    </Layout>
}

export default SharesPage
