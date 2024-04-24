'use client'

import { useCallback, useEffect, useState } from 'react'
import bem from '../../util/bem'
import tauri from '../../tauri'
import { useUpload } from '@/hooks/useUpload'

export const Uploader = () => {
    const [visible, setVisible] = useState(false)

    let dragTimeout = 0

    const drag = useCallback((event: DragEvent) => {
        if (event.dataTransfer?.types.indexOf('Files') !== -1) {
            setVisible(true)

            clearTimeout(dragTimeout)

            dragTimeout = window.setTimeout(() => {
                setVisible(false)
            }, 250)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('dragover', drag)

        return () => window.removeEventListener('dragover', drag)
    }, [drag])

    const upload = useUpload()

    let tauriDragAndDropListenerRegistered = false

    useEffect(() => {
        if (!tauriDragAndDropListenerRegistered && upload) {
            tauriDragAndDropListenerRegistered = true
            tauri.enableDragAndDrop((payload) => {
                upload(payload)
            })
        }
    }, [upload])

    const classes = bem('uploader', [
        ['visible', visible]
    ])

    return <div
        className={classes}
        data-testid="uploader"
    >
        <span className="uploader__label">
            Upload
        </span>
        <input
            data-testid="uploader-input"
            className="uploader__input"
            type="file"
            multiple
            onChange={upload}
        />
    </div>
}
