import { createContext, ReactNode, useState } from 'react'
import * as Icons from '@mdi/js'
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
                    icon: Icons.mdiImageOutline,
                    href: ''
                },
                {
                    label: 'Albums',
                    icon: Icons.mdiImageMultipleOutline,
                    href: 'albums'
                },
                {
                    label: 'Shares',
                    icon: Icons.mdiShareVariant,
                    href: 'shares'
                },
                {
                    label: 'Archive',
                    icon: Icons.mdiArchiveOutline,
                    href: 'archive'
                },
                {
                    label: 'Trash',
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
                    label: 'Settings',
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
                    label: 'General',
                    icon: Icons.mdiCogs,
                    href: 'settings'
                },
                {
                    label: 'Security',
                    icon: Icons.mdiSecurity,
                    href: 'settings/security'
                },
                {
                    label: 'User',
                    icon: Icons.mdiAccountOutline,
                    href: 'settings/user'
                },
                {
                    label: 'Sharing',
                    icon: Icons.mdiShareVariant,
                    href: 'settings/sharing'
                },
                {
                    label: 'API',
                    icon: Icons.mdiApi,
                    href: 'settings/api'
                },
                {
                    label: 'Search',
                    icon: Icons.mdiMagnify,
                    href: 'settings/search'
                },
                {
                    label: 'Sync',
                    icon: Icons.mdiCloudSyncOutline,
                    href: 'settings/sync'
                },
                {
                    label: 'Devices',
                    icon: Icons.mdiDevices,
                    href: 'settings/devices'
                },
                {
                    label: 'Export',
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
                    label: 'Back',
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
