import * as Icons from '@mdi/js'
import { Button, Dropdown } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useLayoutContext } from '@/providers'
import { ELayout } from '@/types/app'
import { useHotkey } from '@/hooks/hotkey'

export const AlbumsViewControl = () => {
    const { t } = useTranslation()
    const [viewDropdownActive, setViewDropdownActive] = useState(false)
    const layout = useLayoutContext()

    const gridView = () => {
        layout.setAlbumsLayout(ELayout.GRID)
        setViewDropdownActive(false)
    }

    const listView = () => {
        layout.setAlbumsLayout(ELayout.LIST)
        setViewDropdownActive(false)
    }

    useHotkey('g', gridView)
    useHotkey('l', listView)

    const viewItems = [
        {
            label: `${t(ETrans.GRID_VIEW)} (G)`,
            callback: gridView,
            icon: Icons.mdiGrid,
            testId: 'gallery-view'
        },
        {
            label: `${t(ETrans.LIST_VIEW)} (L)`,
            callback: listView,
            icon: Icons.mdiFormatListBulletedSquare,
            testId: 'list-view'
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
            testId="view-control"
        />
    </Dropdown>
}
