import * as Icons from '@mdi/js'
import { TAlbum, TMedium } from '@photon/schema'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { isAlbum, isMedium } from '@/util/is'
import { ETrans } from '@/types/translations'
import { Button, Dropdown } from '@/components'
import { DeleteControl, ArchiveControl, RotateControl, DownloadControl } from '@/components/controls'

type Props = {
    element: TMedium | TAlbum
}

export const ListItemControls = ({ element }: Props) => {
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

    if (isMedium(element)) {
        moreItems.push(<RotateControl
            dropdown={true}
            media={[element]}
            callback={toggleDropdown}
        />)

        moreItems.push(<ArchiveControl
            dropdown={true}
            media={[element.id]}
            callback={toggleDropdown}
        />)
    }

    return <div className="actions">
        <DownloadControl elements={isAlbum(element) ? element.media : [element]} />
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
