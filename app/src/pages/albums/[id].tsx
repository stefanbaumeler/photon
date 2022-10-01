import Layout from '@/layouts/layout'
import { Details, Dialog, Media, Uploader } from '@/components'
import { DetailsProvider, EditContext, SelectionContext } from '@/providers'
import { useAlbum } from '@/api/hooks'
import { useRouter } from 'next/router'
import { useAlbumMedia } from '@/api/hooks/albums'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { EEditState, ESelectionMode } from '@/types/app'
import { useRemoveFromAlbum, useUpdateAlbumTitle } from '@/types/api'

const AlbumPage = () => {
    const router = useRouter()
    const id = Array.isArray(router.query.id) ? router.query.id.join('') : router.query.id

    const selection = useContext(SelectionContext)
    const edit = useContext(EditContext)

    const album = useAlbum({
        id
    })

    const media = useAlbumMedia({
        id
    })

    const [title, setTitle] = useState(album.state.title || '')

    useEffect(() => {
        if (album.state.title) {
            setTitle(album.state.title)
        }
    }, [album.state.title])

    const editAlbum = () => {
        selection.setMode(ESelectionMode.DELETE)
    }

    const changeTitle = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        setTitle(target.value)
    }

    const [removeFromAlbum] = useRemoveFromAlbum({
        variables: {
            idAlbum: `${id}`,
            media: Array.from(selection.selected).map((s) => s.id)
        }
    })

    const [updateAlbumTitle] = useUpdateAlbumTitle({
        variables: {
            id: `${id}`,
            title
        }
    })

    useEffect(() => {
        if (edit.state === EEditState.CONFIRMED) {
            Promise.all([removeFromAlbum(), updateAlbumTitle()]).then(() => {
                Promise.all([media.refetch(), album.refetch()]).then(() => {
                    selection.clear()
                })
            })
        }

        if (edit.state === EEditState.DISCARDED) {
            selection.clear()
        }
    }, [edit.state])

    return <Layout>
        <section>
            <div className="album-details">
                <div className="album-details__title-container">
                    <input
                        type="text"
                        className="album-details__title"
                        value={title}
                        onClick={editAlbum}
                        onChange={changeTitle}
                    />
                </div>
                <Dialog />
                <Uploader />
                <DetailsProvider>
                    <Details />
                    <Media media={media.state} />
                </DetailsProvider>
            </div>
        </section>
    </Layout>
}

export default AlbumPage
