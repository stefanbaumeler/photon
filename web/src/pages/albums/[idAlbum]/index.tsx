import * as Icons from '@mdi/js'
import Layout from '@/layouts/app-layout'
import { Button, Details, Media, Uploader } from '@/components'
import { useDetailsContext,
    useEditContext,
    useSearchContext,
    useSelectionContext } from '@/providers'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { EDateFormat, EEditState, ESelectionMode } from '@/types/app'
import { TAlbum, useQAlbum } from '@photon/schema'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { formatDate } from '@/util/date'
import { useSetAlbumCover, useUpdateAlbum, useKeyboard } from '@/hooks'

const AlbumPage = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const details = useDetailsContext()
    const idAlbum = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum

    const selection = useSelectionContext()
    const edit = useEditContext()
    const { hits: media } = useSearchContext()

    const titleEl = useRef(null)

    const [title, setTitle] = useState('')
    const [earliest, setEarliest] = useState('')
    const [latest, setLatest] = useState('')

    const [albumQuery] = useQAlbum({
        variables: {
            id: idAlbum
        },
        pause: !router.isReady
    })

    const setAlbumCover = useSetAlbumCover(idAlbum)
    const updateAlbum = useUpdateAlbum(idAlbum, title)

    const editAlbum = () => {
        selection.setMode(ESelectionMode.DELETE)
    }

    useKeyboard('keyup', 'e', editAlbum)
    useKeyboard('keydown', 'Escape', () => {
        if (!selection.selected.size && !details?.active && edit.state === EEditState.OFF) {
            back()
        }
    })

    useEffect(() => {
        if (albumQuery.data) {
            setTitle(albumQuery.data.album.title || '')
        }
    }, [albumQuery.data])

    useEffect(() => {
        if (selection.mode === ESelectionMode.OFF) {
            titleEl.current?.blur()
        }
    }, [selection.mode])

    useEffect(() => {
        if (edit.state === EEditState.CONFIRMED) {
            if (selection.mode === ESelectionMode.DELETE) {
                updateAlbum()
            }

            if (selection.mode === ESelectionMode.SINGLE) {
                setAlbumCover()
            }

            edit.setState(EEditState.OFF)
        }

        if (edit.state === EEditState.DISCARDED) {
            selection.clear()
            setTitle(title || '')
            edit.setState(EEditState.OFF)
        }
    }, [title, edit, selection, setAlbumCover, updateAlbum, idAlbum])

    useEffect(() => {
        const mediaSortedByDateTaken = [...media]
            .sort((a, b) => new Date(a.dateTaken).getTime() - new Date(b.dateTaken).getTime())

        setEarliest(formatDate(mediaSortedByDateTaken[0]?.dateTaken, EDateFormat.LONG))
        setLatest(formatDate(mediaSortedByDateTaken[mediaSortedByDateTaken.length - 1]?.dateTaken, EDateFormat.LONG))
    }, [media])

    const back = () => {
        selection.clear()
        router.push('/albums')
    }

    return <Layout>
        <section>
            <div className="album-details">
                <div className="album-details__header">
                    <div className="albums-details__back">
                        <Button
                            testId="album-back"
                            hint={{
                                label: t(ETrans.BACK),
                                placement: 'right'
                            }}
                            icon={Icons.mdiArrowLeft}
                            onClick={back}
                        />
                    </div>
                    {title ? <input
                        data-testid="album-title"
                        ref={titleEl}
                        type="text"
                        className="album-details__title"
                        value={title}
                        onClick={editAlbum}
                        onChange={(event) => setTitle(event.target.value)}
                    /> : null}
                    {earliest === latest ? <div className="album-details__dates">
                        <span className="album-details__date">
                            {earliest}
                        </span>
                    </div> : <div className="album-details__dates">
                        <span className="album-details__date">
                            {earliest}
                        </span>
                        <span className="album-details__date-separator">
                            {' - '}
                        </span>
                        <span className="album-details__date">
                            {latest}
                        </span>
                    </div>}
                </div>
                <Uploader />
                <Details />
                <Media />
            </div>
        </section>
    </Layout>
}

export default AlbumPage
