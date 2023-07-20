import { Dropdown } from '@/components/Dropdown'
import { useState } from 'react'
import { TDropdownItem } from '@/types/app'
import { Button } from '@/components'
import * as Icons from '@mdi/js'
import i18next from '@/translations'
import { useUserContext } from '@/providers'
import { useMChangeLanguage } from '@photon/schema'

export const LanguageSwitcher = () => {
    const [moreActive, setMoreActive] = useState(false)
    const { user } = useUserContext()
    const [, changeLanguage] = useMChangeLanguage()

    const moreItems: TDropdownItem[] = [
        {
            label: 'Deutsch',
            callback: () => {
                i18next.changeLanguage('de-DE')
                changeLanguage({
                    language: 'de-DE'
                })
            }
        },
        {
            label: 'English',
            callback: () => {
                i18next.changeLanguage('en-US')
                changeLanguage({
                    language: 'en-US'
                })
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
