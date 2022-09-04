import { createContext, ReactNode, useState } from 'react'
import * as Icons from '@mdi/js'
import { useRouter } from 'next/router'
import { TNav, TNavContext } from '@/types/app'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'

type Props = {
    children?: ReactNode
}

enum ENavs {
    HOME = 'HOME',
    SETTINGS = 'SETTINGS',
    USER = 'USER'
}

const NavContext = createContext<TNavContext>(null)

const NavProvider = ({ children }: Props) => {
    const router = useRouter()
    const { t } = useTranslation()

    const defaultNav = router.route.split('/')[1].toUpperCase()

    const [active, setActive] = useState([Object.values(ENavs).includes(defaultNav.toUpperCase() as ENavs) ? defaultNav : ENavs.HOME])

    const navs = [
        {
            id: ENavs.HOME,
            type: 'main-nav',
            items: [
                {
                    label: t(ETrans.PHOTO_PLURAL),
                    icon: Icons.mdiImageOutline,
                    href: ''
                },
                {
                    label: t(ETrans.ALBUM_PLURAL),
                    icon: Icons.mdiImageMultipleOutline,
                    href: 'albums'
                },
                {
                    label: t(ETrans.SHARING),
                    icon: Icons.mdiShareVariant,
                    href: 'sharing'
                },
                {
                    label: t(ETrans.ARCHIVE),
                    icon: Icons.mdiArchiveOutline,
                    href: 'archive'
                },
                {
                    label: t(ETrans.TRASH),
                    icon: Icons.mdiTrashCanOutline,
                    href: 'trash'
                }
            ]
        },
        {
            id: ENavs.HOME,
            type: 'main-nav',
            items: [
                {
                    label: t(ETrans.SETTING_PLURAL),
                    icon: Icons.mdiCogOutline,
                    subNav: ENavs.SETTINGS,
                    href: 'settings'
                }
            ]
        },
        {
            id: ENavs.SETTINGS,
            type: 'main-nav',
            items: [
                {
                    label: t(ETrans.GENERAL),
                    icon: Icons.mdiCogs,
                    href: 'settings'
                },
                {
                    label: t(ETrans.SECURITY),
                    icon: Icons.mdiSecurity,
                    href: 'settings/security'
                },
                {
                    label: t(ETrans.USER),
                    icon: Icons.mdiAccountOutline,
                    href: 'settings/user'
                },
                {
                    label: t(ETrans.SHARING),
                    icon: Icons.mdiShareVariant,
                    href: 'settings/sharing'
                },
                {
                    label: t(ETrans.API),
                    icon: Icons.mdiApi,
                    href: 'settings/api'
                },
                {
                    label: t(ETrans.SEARCH),
                    icon: Icons.mdiMagnify,
                    href: 'settings/search'
                },
                {
                    label: t(ETrans.SYNC),
                    icon: Icons.mdiCloudSyncOutline,
                    href: 'settings/sync'
                },
                {
                    label: t(ETrans.DEVICE_PLURAL),
                    icon: Icons.mdiDevices,
                    href: 'settings/devices'
                },
                {
                    label: t(ETrans.EXPORT),
                    icon: Icons.mdiExitRun,
                    href: 'settings/export'
                }

            ]
        },
        {
            id: ENavs.SETTINGS,
            type: 'main-nav',
            items: [
                {
                    label: t(ETrans.BACK),
                    icon: Icons.mdiArrowLeft,
                    subNav: ENavs.HOME,
                    href: ''
                }
            ]
        },
        {
            id: ENavs.USER,
            type: 'dropdown',
            items: [
                {
                    label: 'Profile',
                    icon: Icons.mdiAccountOutline
                },
                {
                    label: 'Sign Out',
                    icon: Icons.mdiLogoutVariant
                }
            ]
        }
    ]

    const setActiveItem = (navs: TNav[]) => {
        const route = router.route.substr( 1, router.route.length)
        navs.forEach((nav) => {
            nav.items.forEach((item) => {
                item.active = item.href === route
            })
        })
    }

    setActiveItem(navs)

    return <NavContext.Provider value={{
        active,
        setActive,
        navs
    }}
    >
        {children}
    </NavContext.Provider>
}

export {
    NavProvider, NavContext
}
