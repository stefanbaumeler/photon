import { ChangeEvent, useEffect, useState } from 'react'
import tauri from '../tauri'
import { initializeAuthState } from '@/api'
import { useSearchContext } from '@/providers'

export const useUpload = () => {
    const [files, setFiles] = useState<File[] | FileList>()
    const { refresh } = useSearchContext()

    useEffect(() => {
        if (files) {
            // tauri.upload(files)

            const { accessToken } = initializeAuthState()

            const formData = new FormData()

            for (let i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i])
            }

            fetch(`${process.env.NEXT_PUBLIC_UPLOADS_URL}/uploads`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            }).then(() => {
                setFiles(undefined)
                refresh()
            })
        }
    }, [files, refresh])

    return async (event: ChangeEvent<HTMLInputElement> | string[]) => {
        let files

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
