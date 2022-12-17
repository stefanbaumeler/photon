import * as Icons from '@mdi/js'
import Layout from '@/layouts/layout'
import { Details, Dialog, IconButton, Uploader, Media } from '@/components'
import { DetailsProvider, EditContext, SelectionContext } from '@/providers'
import { useRouter } from 'next/router'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { EDateFormat, EEditState, ESelectionMode } from '@/types/app'
import { QAlbumMediaDocument, QAlbumDocument, TAlbum, TMedium, useQAlbumMedia, useQAlbum, useMRemoveFromAlbum, useMUpdateAlbumTitle } from '@/api'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { formatDate } from '@/util/date'
import useSetAlbumCover from '@/hooks/set-album-cover'

const AlbumPage = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const id = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum

    const selection = useContext(SelectionContext)
    const edit = useContext(EditContext)

    const titleEl = useRef(null)

    const [title, setTitle] = useState('')
    const [album, setAlbum] = useState<TAlbum>()
    const [media, setMedia] = useState<TMedium[]>([])
    const [earliest, setEarliest] = useState('')
    const [latest, setLatest] = useState('')

    const albumQuery = useQAlbum({
        variables: {
            id
        },
        skip: !router.isReady
    })

    const albumMediaQuery = useQAlbumMedia({
        variables: {
            id
        },
        skip: !router.isReady
    })

    const [removeFromAlbum] = useMRemoveFromAlbum({
        variables: {
            idAlbum: `${id}`,
            media: [...selection.selected].map((s) => s.id)
        },
        refetchQueries: [{
            query: QAlbumMediaDocument,
            variables: {
                id
            }
        }]
    })

    const [updateAlbumTitle] = useMUpdateAlbumTitle({
        variables: {
            id,
            title
        },
        refetchQueries: [{
            query: QAlbumDocument,
            variables: {
                id
            }
        }]
    })

    const setAlbumCover = useSetAlbumCover(id)

    useEffect(() => {
        setTitle(album?.title || '')
    }, [album])

    useEffect(() => {
        if (albumQuery.data) {
            setAlbum(albumQuery.data.album)
        }
    }, [albumQuery.data])

    useEffect(() => {
        if (albumMediaQuery.data) {
            setMedia(albumMediaQuery.data.albumMedia)
        }
    }, [albumMediaQuery.data])

    useEffect(() => {
        if (selection.mode === ESelectionMode.OFF) {
            titleEl.current?.blur()
        }
    }, [selection.mode])

    useEffect(() => {
        if (edit.state === EEditState.CONFIRMED) {
            if (selection.mode === ESelectionMode.DELETE) {
                Promise.all([removeFromAlbum(), updateAlbumTitle()]).then(() => {
                    selection.clear()
                })
            }

            if (selection.mode === ESelectionMode.SINGLE) {
                setAlbumCover()
            }

            edit.setState(EEditState.OFF)
        }

        if (edit.state === EEditState.DISCARDED) {
            selection.clear()
            setTitle(album?.title || '')
            edit.setState(EEditState.OFF)
        }
    }, [edit.state])

    useEffect(() => {
        const mediaSortedByDateTaken = Array.from(media)
            .sort((a, b) => new Date(a.dateTaken).getTime() - new Date(b.dateTaken).getTime())

        setEarliest(formatDate(mediaSortedByDateTaken[0]?.dateTaken, EDateFormat.LONG))
        setLatest(formatDate(mediaSortedByDateTaken[mediaSortedByDateTaken.length - 1]?.dateTaken, EDateFormat.LONG))
    }, [media])

    const editAlbum = () => {
        selection.setMode(ESelectionMode.DELETE)
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    if (albumQuery.loading || albumMediaQuery.loading) {
        return <></>
    }

    const back = () => {
        selection.clear()
        router.push('/albums')
    }

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
                            cy="album-back"
                            hint={t(ETrans.BACK)}
                            hintPlacement={'right'}
                            icon={Icons.mdiArrowLeft}
                            solid={true}
                            onClick={back}
                        />
                    </div>
                    <input
                        data-cy="album-title"
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
                    <Media media={media} />
                </DetailsProvider>
            </div>
        </section>
    </Layout>
}

export default AlbumPage
