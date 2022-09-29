import Layout from '@/layouts/layout'
import { Details, Dialog, Media, Uploader } from '@/components'
import { DetailsProvider, SelectionContext } from '@/providers'
import { useAlbum } from '@/api/hooks'
import { useRouter } from 'next/router'
import { useAlbumMedia } from '@/api/hooks/albums'
import { useContext } from 'react'
import { ESelectionMode } from '@/types/app'

const AlbumPage = () => {
    const router = useRouter()
    const id = Array.isArray(router.query.id) ? router.query.id.join('') : router.query.id

    const selection = useContext(SelectionContext)

    const { state: [album] } = useAlbum({
        id
    })

    const { state: [media] } = useAlbumMedia({
        id
    })

    const edit = () => {
        selection.setMode(ESelectionMode.DELETE)
    }

    return <Layout>
        <section>
            <div className="album">
                <div className="album__title-container">
                    <input
                        type="text"
                        className="album__title"
                        value={album.title}
                        onClick={edit}
                    />
                </div>
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

export default AlbumPage
