import { ChangeEvent } from 'react'
import { useMediaQuery } from '@/types/api'

const useUpload = () => {
    const media = useMediaQuery({
        skip: true
    })

    return (event: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData()

        for (let i = 0; i < event.target.files.length; i++) {
            formData.append('upload', event.target.files[i])
        }

        fetch('http://localhost:2000/media', {
            method: 'post',
            body: formData
        }).then(() => {
            media.refetch().then(() => {
                event.target.value = ''
            })
        })
    }
}

export default useUpload
