import { Dropdown } from '@/components/Dropdown'
import { useState } from 'react'
import { TDropdownItem } from '@/types/app'
import { Button } from '@/components'
import * as Icons from '@mdi/js'
import i18next from '@/translations'

export const LanguagePicker = () => {
    const [moreActive, setMoreActive] = useState(false)

    const moreItems: TDropdownItem[] = [
        {
            label: 'Deutsch',
            callback: () => {
                i18next.changeLanguage('de-DE')
            }
        },
        {
            label: 'English',
            callback: () => {
                i18next.changeLanguage('en-US')
            }
        }
    ]

    return <Dropdown
        items={moreItems}
        active={moreActive}
        onClickOutside={() => setMoreActive(false)}
    >
        <Button
            icon={Icons.mdiTranslate}
            appearance={{
                type: 'secondary',
                size: 'small'
            }}
            label={'English'}
            onClick={() => setMoreActive(!moreActive)}
        />
    </Dropdown>
}
