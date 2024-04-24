import Layout from '@/layouts/app-layout'
import { Albums } from '@/components/shared/Albums'
import { Uploader } from '@/components/shared/Uploader'

const AlbumsPage = () => {
    return <Layout>
        <Uploader />
        <Albums />
    </Layout>
}

export default AlbumsPage
