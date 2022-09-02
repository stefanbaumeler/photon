import { createContext, ReactNode, useState } from 'react'
import { mdiAccountOutline, mdiApi,
    mdiArchiveOutline, mdiArrowLeft, mdiCloudSyncOutline, mdiCogOutline, mdiCogs, mdiDevices, mdiExitRun,
    mdiImageMultipleOutline,
    mdiImageOutline, mdiLogoutVariant, mdiMagnify, mdiSecurity,
    mdiShareVariant,
    mdiTrashCanOutline } from '@mdi/js'
import { useRouter } from 'next/router'
import { TNav, TNavContext } from '@/types/app'

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

    const defaultNav = router.route.split('/')[1].toUpperCase()

    const [active, setActive] = useState([Object.values(ENavs).includes(defaultNav.toUpperCase() as ENavs) ? defaultNav : ENavs.HOME])

    const navs = [
        {
            id: ENavs.HOME,
            type: 'main-nav',
            items: [
                {
                    label: 'Photos',
                    icon: mdiImageOutline,
                    href: ''
                },
                {
                    label: 'Albums',
                    icon: mdiImageMultipleOutline,
                    href: 'albums'
                },
                {
                    label: 'Shares',
                    icon: mdiShareVariant,
                    href: 'shares'
                },
                {
                    label: 'Archive',
                    icon: mdiArchiveOutline,
                    href: 'archive'
                },
                {
                    label: 'Trash',
                    icon: mdiTrashCanOutline,
                    href: 'trash'
                }
            ]
        },
        {
            id: ENavs.HOME,
            type: 'main-nav',
            items: [
                {
                    label: 'Settings',
                    icon: mdiCogOutline,
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
                    label: 'General',
                    icon: mdiCogs,
                    href: 'settings'
                },
                {
                    label: 'Security',
                    icon: mdiSecurity,
                    href: 'settings/security'
                },
                {
                    label: 'User',
                    icon: mdiAccountOutline,
                    href: 'settings/user'
                },
                {
                    label: 'Sharing',
                    icon: mdiShareVariant,
                    href: 'settings/sharing'
                },
                {
                    label: 'API',
                    icon: mdiApi,
                    href: 'settings/api'
                },
                {
                    label: 'Search',
                    icon: mdiMagnify,
                    href: 'settings/search'
                },
                {
                    label: 'Sync',
                    icon: mdiCloudSyncOutline,
                    href: 'settings/sync'
                },
                {
                    label: 'Devices',
                    icon: mdiDevices,
                    href: 'settings/devices'
                },
                {
                    label: 'Export',
                    icon: mdiExitRun,
                    href: 'settings/export'
                }

            ]
        },
        {
            id: ENavs.SETTINGS,
            type: 'main-nav',
            items: [
                {
                    label: 'Back',
                    icon: mdiArrowLeft,
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
                    icon: mdiAccountOutline
                },
                {
                    label: 'Sign Out',
                    icon: mdiLogoutVariant
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
