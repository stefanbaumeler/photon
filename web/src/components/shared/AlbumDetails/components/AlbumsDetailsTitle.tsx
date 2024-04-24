'use client'

import { useEffect, useRef, useState } from 'react'
import { EEditState, EKeyboardScope, ESelectionMode } from '@/types/app'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useUpdateAlbum } from '@/hooks/update-album'
import { useParams } from 'next/navigation'
import { useEditContext } from '@/providers/EditProvider'
import { useSetAlbumCover } from '@/hooks/set-album-cover'
import { useHotkey } from '@/hooks/hotkey'
import { useQAlbum } from '@photon/schema/dist/client'

export const AlbumsDetailsTitle = () => {
    const params = useParams()
    const idAlbum = Array.isArray(params.idAlbum) ? params.idAlbum[0] : params.idAlbum

    const [albumQuery] = useQAlbum({
        variables: {
            id: idAlbum
        }
    })

    const album = albumQuery.data?.album

    const titleEl = useRef<HTMLInputElement>(null)
    const [updatedTitle, setUpdatedTitle] = useState(album?.title)

    const selection = useSelectionContext()
    const edit = useEditContext()

    const updateAlbum = useUpdateAlbum(updatedTitle ?? '', idAlbum)
    const setAlbumCover = useSetAlbumCover(idAlbum)

    const editAlbum = () => {
        selection.setMode(ESelectionMode.DELETE)
    }

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
            setUpdatedTitle(album?.title ?? '')
            edit.setState(EEditState.OFF)
        }
    }, [album?.title, edit, selection, setAlbumCover, updateAlbum, idAlbum])

    useHotkey({
        key: 'e',
        callback: editAlbum,
        scopes: EKeyboardScope.album
    })

    return <input
        data-testid="album-title"
        ref={titleEl}
        type="text"
        className="album-details__title"
        value={updatedTitle ?? ''}
        onClick={editAlbum}
        onChange={(event) => setUpdatedTitle(event.target.value)}
    />
}
