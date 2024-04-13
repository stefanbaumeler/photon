import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useUpload } from '@/hooks'
import { useRef } from 'react'
import { useHotkey } from '@/hooks/hotkey'

type Props = {
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const UploadControl = ({
    dropdown, shortcut, callback
}: Props) => {
    const { t } = useTranslation()
    const uploadRef = useRef<HTMLInputElement>(null)
    const upload = useUpload()

    const action = () => {
        uploadRef.current.click()
        callback && callback()
    }

    useHotkey({
        key: 'c',
        callback: action,
        condition: !!shortcut
    })

    return <>
        <input
            data-testid="upload"
            type="file"
            className="actions__uploader"
            ref={uploadRef}
            onChange={upload}
            multiple
        />
        {dropdown ? <DropdownItem item={{
            testId: 'upload',
            label: t(ETrans.UPLOAD),
            callback: action,
            shortcut: shortcut && 'C'
        }}
        /> : <Button
            testId="upload"
            hint={t(ETrans.UPLOAD)}
            shortcut={shortcut && 'C'}
            icon={Icons.mdiTrayArrowUp}
            onClick={action}
        />}
    </>
}
