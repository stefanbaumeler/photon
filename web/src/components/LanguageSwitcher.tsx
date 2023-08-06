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

    if (!language) {
        return <></>
    }

    const moreItems: TDropdownItem[] = [
        {
            label: 'Deutsch',
            callback: () => {
                i18next.changeLanguage('de-DE')
                setLanguage('Deutsch')
                changeLanguage({
                    language: 'de-DE'
                })
                setMoreActive(false)
            }
        },
        {
            label: 'English',
            callback: () => {
                i18next.changeLanguage('en-US')
                setLanguage('English')
                changeLanguage({
                    language: 'en-US'
                })
                setMoreActive(false)
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
            label={language}
            onClick={() => setMoreActive(!moreActive)}
        />
    </Dropdown>
}
