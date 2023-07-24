import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useKeyboard } from '@/hooks/keyboard'
import { useRef } from 'react'
import useUpload from '@/hooks/upload'

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

    useKeyboard('keyup', 'c', shortcut && action)

    const Input = () => <input
        data-testid="upload"
        type="file"
        className="actions__uploader"
        ref={uploadRef}
        onChange={upload}
        multiple={true}
    />

    if (dropdown) {
        return <>
            <Input />
            <DropdownItem item={{
                testId: 'upload',
                label: t(ETrans.UPLOAD),
                callback: action,
                shortcut: shortcut && 'C'
            }}
            />
        </>
    }

    return <>
        <Input />
        <Button
            testId="upload"
            hint={t(ETrans.UPLOAD)}
            shortcut={shortcut && 'C'}
            icon={Icons.mdiTrayArrowUp}
            onClick={action}
        />
    </>
}
