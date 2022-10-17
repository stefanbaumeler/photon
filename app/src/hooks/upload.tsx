import { useAlbums, useMedia } from '@/api/hooks'
import { ChangeEvent } from 'react'

const useUpload = () => {
    const albums = useAlbums()
    const media = useMedia()

    return (event: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData()

        for (let i = 0; i < event.target.files.length; i++) {
            formData.append('upload', event.target.files[i])
        }

        fetch('http://localhost:2000/media', {
            method: 'post',
            body: formData
        }).then((response) => {
            Promise.all([albums.refetch(), media.refetch()]).then(() => {
                event.target.value = ''
            })
        })
    }
}

export default useUpload
