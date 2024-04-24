import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { ELayout, TDropdownItem } from '@/types/app'
import { useHotkey } from '@/hooks/hotkey'
import { useLayoutContext } from '@/providers/LayoutProvider'
import { Dropdown } from '@/components/shared/Dropdown'
import { Button } from '@/components/shared/Button'

export const ViewControl = () => {
    const { t } = useTranslation()
    const [viewDropdownActive, setViewDropdownActive] = useState(false)
    const layout = useLayoutContext()

    const galleryView = () => {
        layout.setLayout(ELayout.GALLERY)
        setViewDropdownActive(false)
    }

    const mapView = () => {
        layout.setLayout(ELayout.MAP)
        setViewDropdownActive(false)
    }

    const listView = () => {
        layout.setLayout(ELayout.LIST)
        setViewDropdownActive(false)
    }

    useHotkey({
        key: 'g',
        callback: galleryView
    })

    useHotkey({
        key: 'm',
        callback: mapView
    })

    useHotkey({
        key: 'l',
        callback: listView
    })

    const viewItems: TDropdownItem[] = [
        {
            label: t(ETrans.GALLERY_VIEW),
            callback: galleryView,
            icon: Icons.mdiViewCompact,
            testId: 'gallery-view',
            shortcut: 'G'
        },
        {
            label: t(ETrans.MAP_VIEW),
            callback: mapView,
            icon: Icons.mdiMapMarker,
            testId: 'map-view',
            shortcut: 'M'
        },
        {
            label: t(ETrans.LIST_VIEW),
            callback: listView,
            icon: Icons.mdiFormatListBulletedSquare,
            testId: 'list-view',
            shortcut: 'L'
        }
    ]

    return <Dropdown
        items={viewItems}
        active={viewDropdownActive}
        onClickOutside={() => setViewDropdownActive(false)}
    >
        <Button
            hint={t(ETrans.VIEW)}
            icon={Icons.mdiEye}
            onClick={() => setViewDropdownActive(!viewDropdownActive)}
            testId="view"
        />
    </Dropdown>
}
