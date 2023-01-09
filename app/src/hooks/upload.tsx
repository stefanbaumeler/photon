import { ChangeEvent, useEffect, useState } from 'react'
import { QMediaDocument, QMediaYearCountDocument, useMUpload } from '../api'
import tauri from '../tauri'
import { useMediaContext } from '../providers'

const useUpload = () => {
    const [files, setFiles] = useState<File[]>()

    const media = useMediaContext()

    const [upload] = useMUpload({
        variables: {
            files
        },
        refetchQueries: [{
            query: QMediaDocument,
            variables: {
                status: media.status,
                sort: media.sort
            }
        }, QMediaYearCountDocument]
    })

    useEffect(() => {
        if (files) {
            tauri.upload(files)

            upload().then(() => {
                setFiles(undefined)
            })
        }
    }, [files])

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

export default useUpload
