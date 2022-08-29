import Layout from '@/layouts/layout'
import { useMedia } from '@/api/hooks'
import { Media, Uploader, Details } from '@/components'
import { DetailsProvider } from '@/providers'

const Home = () => {
    const { state: [{ media }] } = useMedia()

    return <Layout>
        <section>
            <div>
                <Uploader />
                <div>
                    <h1>
                        Settings
                    </h1>
                </div>
            </div>
        </section>
    </Layout>
}

export default Home
