import { ListCell } from '../ListCell'
import { Button, Dropdown } from '@/components'
import * as Icons from '@mdi/js'
import { useState } from 'react'
import { columns } from '../columns'
import { useTranslation } from 'react-i18next'
import { useListContext } from '../ListContext'

export const ControlsHeader = () => {
    const cell = 'controls'

    const [moreActive, setMoreActive] = useState(false)
    const { t } = useTranslation('listHeaders')
    const { headers } = useListContext()

    const moreItems = Object.keys(columns).map((column) => {
        return {
            icon: headers.includes(column) ? Icons.mdiEyeOutline : Icons.mdiEyeOff,
            label: t(column),
            callback: () => { }
        }
    })

    return <ListCell cell={cell}>
        <Dropdown
            items={moreItems}
            active={moreActive}
            onClickOutside={() => setMoreActive(false)}
        >
            <Button
                icon={Icons.mdiPlus}
                appearance={{
                    type: 'secondary',
                    size: 'small'
                }}
                hint={'ADD COLUMN'}
                onClick={() => setMoreActive(!moreActive)}
            />
        </Dropdown>
    </ListCell>
}
