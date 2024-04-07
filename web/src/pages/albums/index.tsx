import Layout from '@/layouts/app-layout'
import { Albums, Uploader } from '@/components'
import { useQAlbums } from '@photon/schema'

const AlbumsPage = () => {
    const [{  data: albums }] = useQAlbums()

    return <Layout>
        <section>
            <Uploader />
            <Albums albums={albums?.albums || []} />
        </section>
    </Layout>
}

export default AlbumsPage
