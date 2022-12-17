import { ChangeEvent, useEffect, useState } from 'react'
import { QMediaDocument, useMUpload } from '@/api'

const useUpload = () => {
    const [file, setFile] = useState<FileList>()

    const [upload] = useMUpload({
        variables: {
            file
        },
        refetchQueries: [QMediaDocument]
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
