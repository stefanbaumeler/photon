import Layout from '@/layouts/layout'
import { useAlbums } from '@/api/hooks'
import { Albums, Uploader, Dialog } from '@/components'

const AlbumsPage = () => {
    const albums = useAlbums()

    return <Layout>
        <section>
            <div>
                <Dialog />
                <Uploader />
                <Albums albums={albums.state} />
            </div>
        </section>
    </Layout>
}

export default AlbumsPage
