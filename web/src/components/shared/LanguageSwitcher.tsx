import { useEffect, useState } from 'react'
import { TDropdownItem } from '@/types/app'
import * as Icons from '@mdi/js'
import i18next from '@/translations'
import { useMChangeLanguage, useQProfile } from '@photon/schema/dist/client'
import { Dropdown } from '@/components/shared/Dropdown'
import { Button } from '@/components/shared/Button'

export const LanguageSwitcher = () => {
    const [moreActive, setMoreActive] = useState(false)
    const [{ data: user }] = useQProfile()
    const [language, setLanguage] = useState('')
    const [, changeLanguage] = useMChangeLanguage()

    useEffect(() => {
        if (user?.profile.language) {
            setLanguage(user?.profile.language === 'en-US' ? 'English' : 'Deutsch')
        }
    }, [user?.profile.language])

    const moreItems: TDropdownItem[] = [
        {
            label: 'Deutsch',
            callback: () => {
                setLanguage('Deutsch')
                i18next.changeLanguage('de-DE')
                setMoreActive(false)
                changeLanguage({
                    language: 'de-DE'
                })
            }
        },
        {
            label: 'English',
            callback: () => {
                setMoreActive(false)
                i18next.changeLanguage('en-US')
                setLanguage('English')
                changeLanguage({
                    language: 'en-US'
                })
            }
        }
    ]

    return language ? <Dropdown
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
            label={language}
            onClick={() => setMoreActive(!moreActive)}
        />
    </Dropdown> : null
}
