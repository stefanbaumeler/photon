import { ChangeEvent, useEffect, useState } from 'react'
import { QMediaYearCountDocument, useMUpload } from '@photon/schema'
import tauri from '../tauri'
import { FileUpload } from 'graphql-upload-minimal'
import { useSearchContext } from 'web/src/providers'

const useUpload = () => {
    const [files, setFiles] = useState<File[]>()

    const search = useSearchContext()

    const [upload] = useMUpload({
        variables: {
            files: files as unknown as Promise<FileUpload>
        },
        refetchQueries: [
            {
                query: QMediaYearCountDocument
            }
        ]
    })

    useEffect(() => {
        if (files) {
            tauri.upload(files)

            upload().then(() => {
                search.instantSearch.refresh()
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
