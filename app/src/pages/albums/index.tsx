import Layout from '@/layouts/layout'
import { useAlbums } from '@/api/hooks'
import { Albums, Uploader, Dialog } from '@/components'

const AlbumsPage = () => {
    const { state: [{ albums }] } = useAlbums()
    return <Layout>
        <section>
            <div>
                <Dialog />
                <Uploader />
                <Albums albums={albums} />
            </div>
        </section>
    </Layout>
}

export default AlbumsPage
