import * as Icons from '@mdi/js'
import { Dropdown, Button } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useLayoutContext } from '@/providers'
import { ELayout } from '@/types/app'

export const AlbumsViewControl = () => {
    const { t } = useTranslation()
    const [viewDropdownActive, setViewDropdownActive] = useState(false)
    const layout = useLayoutContext()

    const viewItems = [
        {
            label: t(ETrans.GRID_VIEW),
            callback: () => {
                layout.setAlbumsLayout(ELayout.GRID)
                setViewDropdownActive(false)
            },
            icon: Icons.mdiGrid,
            testId: 'gallery-view'
        },
        {
            label: t(ETrans.LIST_VIEW),
            callback: () => {
                layout.setAlbumsLayout(ELayout.LIST)
                setViewDropdownActive(false)
            },
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
