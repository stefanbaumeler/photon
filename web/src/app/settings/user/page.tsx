import Layout from '@/layouts/app-layout'
import { Uploader } from '@/components/shared/Uploader'

const UserPage = () => {
    return <Layout>
        <section>
            <div>
                <Uploader />
            </div>
        </section>
    </Layout>
}

export default UserPage
