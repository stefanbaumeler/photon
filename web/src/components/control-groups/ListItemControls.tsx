import * as Icons from '@mdi/js'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { ETrans } from '@/types/translations'
import { Button, Dropdown } from '@/components'
import { DeleteControl, ArchiveControl, RotateControl } from '@/components/controls'
import { DownloadMediaControl } from '@/components/controls/DownloadMediaControl'

type Props = {
    element: string
    album?: boolean
    downloadElements: string[]
}

export const ListItemControls = ({
    element, album = false, downloadElements
}: Props) => {
    const { t } = useTranslation()

    const [moreActive, setMoreActive] = useState(false)

    const moreItems = []

    const toggleDropdown = () => {
        setMoreActive(!moreActive)
    }

    moreItems.push(<DeleteControl
        dropdown={true}
        elements={[element]}
        callback={toggleDropdown}
    />)

    if (!album) {
        moreItems.push(<RotateControl
            dropdown={true}
            media={[element]}
            callback={toggleDropdown}
        />)

        moreItems.push(<ArchiveControl
            dropdown={true}
            media={[element]}
            callback={toggleDropdown}
        />)
    }

    return <div className="actions">
        <DownloadMediaControl elements={downloadElements} />
        <Dropdown
            items={moreItems}
            active={moreActive}
            onClickOutside={() => setMoreActive(false)}
        >
            <Button
                hint={t(ETrans.MORE_OPTIONS)}
                icon={Icons.mdiDotsVertical}
                onClick={toggleDropdown}
            />
        </Dropdown>
    </div>
}
