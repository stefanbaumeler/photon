import { ChangeEvent, useEffect, useState } from 'react'
import { useMUpload } from '@photon/schema'
import tauri from '../tauri'
import { FileUpload } from 'graphql-upload-minimal'

export const useUpload = () => {
    const [files, setFiles] = useState<File[]>()

    const [, upload] = useMUpload()

    useEffect(() => {
        if (files) {
            tauri.upload(files)

            upload({
                files: files as unknown as Promise<FileUpload>
            }).then(() => {
                setFiles(undefined)
            })
        }
    }, [upload, files])

    return async (event: ChangeEvent<HTMLInputElement> | string[]) => {
        let files: File[]

        const asChangeEvent = event as ChangeEvent<HTMLInputElement>
        const asFileDropEvent = event as string[]

        if (asChangeEvent.target) {
            files = [...asChangeEvent.target.files]
        }
        else {
            files = await tauri.read(asFileDropEvent)
        }

        if (!files) {
            return
        }

        setFiles(files)
    }
}
