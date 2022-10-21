import * as Icons from '@mdi/js'
import { IconButton } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useContext, useRef } from 'react'
import { NavContext, SelectionContext } from '@/providers'
import { ENavItemType, ESelectionMode } from '@/types/app'
import useUpload from '@/hooks/upload'

const DefaultActions = () => {
    const { t } = useTranslation()

    const nav = useContext(NavContext)
    const selection = useContext(SelectionContext)

    const uploadRef = useRef<HTMLInputElement>(null)

    const item = nav.getActiveItem()

    const clickUpload = () => {
        uploadRef.current.click()
    }

    const upload = useUpload()

    if (item.type === ENavItemType.ALBUMS || selection.mode !== ESelectionMode.OFF) {
        return <></>
    }

    return <div className="actions">
        <input
            data-cy="upload-action"
            type="file"
            className="actions__uploader"
            ref={uploadRef}
            onChange={upload}
            multiple={true}
        />
        <IconButton
            hint={t(ETrans.UPLOAD)}
            icon={Icons.mdiTrayArrowUp}
            onClick={clickUpload}
        />
    </div>
}

export default DefaultActions
