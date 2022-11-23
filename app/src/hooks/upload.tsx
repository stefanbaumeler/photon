import { ChangeEvent, useEffect, useState } from 'react'
import { MediaQueryDocument, useUpload as useUploadMutation } from '@photon/shared'

const useUpload = () => {
    const [file, setFile] = useState<FileList>()

    const [upload] = useUploadMutation({
        variables: {
            file
        },
        refetchQueries: [MediaQueryDocument]
    })

    useEffect(() => {
        if (file) {
            upload().then(() => {
                setFile(undefined)
            })
        }
    }, [file])

    return (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files
        if (!file) {
            return
        }

        setFile(file)
    }
}

export default useUpload
