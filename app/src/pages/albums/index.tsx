import Layout from '@/layouts/layout'
import { Albums, Uploader, Dialog } from '@/components'
import { useAlbumsQuery } from '@photon/shared'

const AlbumsPage = () => {
    const albums = useAlbumsQuery()

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
