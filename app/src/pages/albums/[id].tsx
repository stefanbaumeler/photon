import Layout from '@/layouts/layout'
import { Uploader, Details, Dialog, Media } from '@/components'
import { DetailsProvider } from '@/providers'
import { useAlbum } from '@/api/hooks'
import { useRouter } from 'next/router'
import { useAlbumMedia } from '@/api/hooks/albums'

const Home = () => {
    const router = useRouter()
    const id = Array.isArray(router.query.id) ? router.query.id.join('') : router.query.id

    const { state: [album] } = useAlbum({
        id
    })

    const { state: [media] } = useAlbumMedia({
        id
    })

    return <Layout>
        {album.title}
        <section>
            <div>
                <Dialog />
                <Uploader />
                <DetailsProvider>
                    <Details />
                    <Media media={media} />
                </DetailsProvider>
            </div>
        </section>
    </Layout>
}

export default Home
