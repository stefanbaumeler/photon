import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { ELayout } from '@/types/app'
import { useHotkey } from '@/hooks/useHotkey'
import { useLayoutContext } from '@/src/providers/LayoutProvider'
import { Button } from '../shared/Button'
import { Dropdown } from '../shared/Dropdown'

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

    useHotkey({
        key: 'g',
        callback: gridView
    })

    useHotkey({
        key: 'l',
        callback: listView
    })

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
