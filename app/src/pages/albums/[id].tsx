import * as Icons from '@mdi/js'
import Layout from '@/layouts/layout'
import { Details, Dialog, IconButton, Media, Uploader } from '@/components'
import { DetailsProvider, EditContext, SelectionContext } from '@/providers'
import { useAlbum } from '@/api/hooks'
import { useRouter } from 'next/router'
import { useAlbumMedia } from '@/api/hooks/albums'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { EDateFormat, EEditState, ESelectionMode } from '@/types/app'
import { useRemoveFromAlbum, useUpdateAlbumTitle } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { formatDate } from '@/util/date'

const AlbumPage = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const id = Array.isArray(router.query.id) ? router.query.id.join('') : router.query.id
    const titleEl = useRef(null)

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

    useEffect(() => {
        if (selection.mode === ESelectionMode.OFF) {
            titleEl.current.blur()
        }
    }, [selection.mode])

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

    const [earliest, setEarliest] = useState('')
    const [latest, setLatest] = useState('')

    useEffect(() => {
        const mediaSortedByDateTaken = media.state
            .sort((a, b) => new Date(a.dateTaken).getTime() - new Date(b.dateTaken).getTime())

        setEarliest(formatDate(mediaSortedByDateTaken[0]?.dateTaken, EDateFormat.LONG))
        setLatest(formatDate(mediaSortedByDateTaken[mediaSortedByDateTaken.length - 1]?.dateTaken, EDateFormat.LONG))
    }, [media])

    const AlbumDetailsDates = () => {
        if (earliest === latest) {
            return <div className="album-details__dates">
                <span className="album-details__date">
                    {earliest}
                </span>
            </div>
        }
        return <div className="album-details__dates">
            <span className="album-details__date">
                {earliest}
            </span>
            <span className="album-details__date-separator">
                {' - '}
            </span>
            <span className="album-details__date">
                {latest}
            </span>
        </div>
    }

    return <Layout>
        <section>
            <div className="album-details">
                <div className="album-details__header">
                    <div className="albums-details__back">
                        <IconButton
                            hint={t(ETrans.BACK)}
                            hintPlacement={'right'}
                            icon={Icons.mdiArrowLeft}
                            solid={true}
                            href={'/albums'}
                        />
                    </div>
                    <input
                        ref={titleEl}
                        type="text"
                        className="album-details__title"
                        value={title}
                        onClick={editAlbum}
                        onChange={changeTitle}
                    />
                    <AlbumDetailsDates />
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
