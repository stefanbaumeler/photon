import * as Icons from '@mdi/js'
import { IconButton } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useContext, useRef } from 'react'
import { NavContext, SelectionContext } from '@/providers'
import { ENavItemType, ESelectionMode } from '@/types/app'
import { useAlbums } from '@/api/hooks'

const DefaultActions = () => {
    const { t } = useTranslation()

    const nav = useContext(NavContext)
    const selection = useContext(SelectionContext)

    const uploadRef = useRef<HTMLInputElement>(null)

    const item = nav.getActiveItem()

    const { refetch } = useAlbums()

    const upload = () => {
        uploadRef.current.click()
    }

    const change = () => {
        const formData = new FormData()

        for (let i = 0; i < uploadRef.current.files.length; i++) {
            formData.append('upload', uploadRef.current.files[i])
        }

        fetch('http://localhost:2000/media', {
            method: 'post',
            body: formData
        }).then(() => {
            refetch().then(() => {
                uploadRef.current.value = ''
            })
        })
    }

    if (item.type === ENavItemType.ALBUMS || selection.mode !== ESelectionMode.OFF) {
        return <></>
    }

    return <div className="actions">
        <input
            type="file"
            className="actions__uploader"
            ref={uploadRef}
            onChange={change}
            multiple={true}
        />
        <IconButton
            hint={t(ETrans.UPLOAD)}
            icon={Icons.mdiTrayArrowUp}
            onClick={upload}
        />
    </div>
}

export default DefaultActions
