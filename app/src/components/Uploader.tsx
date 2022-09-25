import { useEffect, useRef, useState } from 'react'
import { useMedia } from '@/api/hooks'

const Uploader = () => {
    const upload = useRef<HTMLInputElement>(null)
    const [visible, setVisible] = useState(false)
    let dragTimeout = 0

    const drag = (event: DragEvent) => {
        if (event.dataTransfer.types.indexOf('Files') !== -1) {
            setVisible(true)

            clearTimeout(dragTimeout)

            dragTimeout = window.setTimeout(() => {
                setVisible(false)
            }, 250)
        }
    }

    useEffect(() => {
        window.addEventListener('dragover', drag)

        return () => {
            window.removeEventListener('dragover', drag)
        }
    }, [])

    const change = () => {
        const formData = new FormData()

        for (let i = 0; i < upload.current.files.length; i++) {
            formData.append('upload', upload.current.files[i])
        }

        fetch('http://localhost:2000/media', {
            method: 'post',
            body: formData
        }).then(() => {
            refetch().then(() => {
                upload.current.value = ''
            })
        })
    }

    const { refetch } = useMedia()

    return <div className={`uploader${visible ? ' uploader--visible' : ''}`}>
        <span className="uploader__label">
            Upload
        </span>
        <input
            className="uploader__input"
            ref={upload}
            type="file"
            multiple={true}
            onChange={change}
        />
    </div>
}

export default Uploader
