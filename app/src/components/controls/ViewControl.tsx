import * as Icons from '@mdi/js'
import { Dropdown, IconButton } from '../index'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useLayoutContext } from '@/providers'
import { ELayout } from '@/types/app'
export const ViewControl = () => {
    const { t } = useTranslation()
    const [viewDropdownActive, setViewDropdownActive] = useState(false)
    const layout = useLayoutContext()

    const viewItems = [
        {
            label: t(ETrans.GALLERY_VIEW),
            callback: () => layout.setLayout(ELayout.GALLERY),
            icon: Icons.mdiViewCompact
        },
        {
            label: t(ETrans.MAP_VIEW),
            callback: () => layout.setLayout(ELayout.MAP),
            icon: Icons.mdiMapMarker
        },
        {
            label: t(ETrans.LIST_VIEW),
            callback: () => layout.setLayout(ELayout.LIST),
            icon: Icons.mdiFormatListBulletedSquare
        }
    ]

    return <Dropdown
        items={viewItems}
        active={viewDropdownActive}
        onClickOutside={() => setViewDropdownActive(false)}
    >
        <IconButton
            hint={t(ETrans.VIEW)}
            icon={Icons.mdiEye}
            onClick={() => setViewDropdownActive(!viewDropdownActive)}
        />
    </Dropdown>
}
