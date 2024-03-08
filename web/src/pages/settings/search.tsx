import Layout from '@/layouts/app-layout'
import { Uploader, Details } from '@/components'

const SearchPage = () => {
    return <Layout>
        <section>
            <div>
                <Uploader />
                <Details />
            </div>
        </section>
    </Layout>
}

export default SearchPage
