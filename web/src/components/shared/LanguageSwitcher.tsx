import { useEffect, useState } from 'react'
import { TDropdownItem } from '@/types/app'
import { Button, Dropdown } from '@/components'
import * as Icons from '@mdi/js'
import i18next from '@/translations'
import { useUserContext } from '@/providers'
import { useMChangeLanguage } from '@photon/schema'

export const LanguageSwitcher = () => {
    const [moreActive, setMoreActive] = useState(false)
    const { user } = useUserContext()
    const [language, setLanguage] = useState('')
    const [, changeLanguage] = useMChangeLanguage()

    useEffect(() => {
        if (user?.language) {
            setLanguage(user?.language === 'en-US' ? 'English' : 'Deutsch')
        }
    }, [user?.language])

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
