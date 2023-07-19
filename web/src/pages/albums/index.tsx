import Layout from '../../layouts/layout'
import { Albums, Uploader, Dialog } from '@/components'
import { useQAlbums } from '@photon/schema'

const AlbumsPage = () => {
    const [albums] = useQAlbums()

    return <Layout>
        <section>
            <div>
                <Dialog />
                <Uploader />
                <Albums albums={albums.data?.albums || []} />
            </div>
        </section>
    </Layout>
}

export default AlbumsPage
