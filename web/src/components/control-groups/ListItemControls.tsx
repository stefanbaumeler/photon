import * as Icons from '@mdi/js'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { ETrans } from '@/types/translations'
import { Button, Dropdown } from '@/components'
import { MoveToTrashControl, ArchiveControl, RotateControl, DownloadMediaControl } from '@/components/controls'

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

    const toggleDropdown = () => {
        setMoreActive(!moreActive)
    }

    const moreItems = [
        <MoveToTrashControl
            key={0}
            dropdown
            elements={[element]}
            callback={toggleDropdown}
        />
    ]

    if (!album) {
        moreItems.push(<RotateControl
            dropdown
            callback={toggleDropdown}
        />)

        moreItems.push(<ArchiveControl
            dropdown
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
                testId="teaser-nav"
            />
        </Dropdown>
    </div>
}
