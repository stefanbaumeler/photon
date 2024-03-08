import Layout from '@/layouts/layout'
import { Albums, Dialog, Uploader } from '@/components'
import { useQAlbums } from '@photon/schema'

const AlbumsPage = () => {
    const [{  data: albums }] = useQAlbums()

    return <Layout>
        <section>
            <div>
                <Dialog />
                <Uploader />
                <Albums albums={albums?.albums || []} />
            </div>
        </section>
    </Layout>
}

export default AlbumsPage
