import { ChangeEvent, useEffect, useState } from 'react'
import bem from '@/util/bem'
import useUpload from '@/hooks/upload'

const Uploader = () => {
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

    const upload = useUpload()

    const classes = bem('uploader', [
        ['visible', visible]
    ])

    return <div className={classes}>
        <span className="uploader__label">
            Upload
        </span>
        <input
            className="uploader__input"
            type="file"
            multiple={true}
            onChange={upload}
        />
    </div>
}

export default Uploader
