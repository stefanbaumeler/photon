import { createContext, ReactNode, useContext, useState } from 'react'
import * as Icons from '@mdi/js'
import { useRouter } from 'next/router'
import { EMediumStatus, ENavItemType, ENavs, TNav, TNavContext, TNavItem } from '@/types/app'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { useDragContext, useSelectionContext } from '@/providers'
import useAddToFavorites from '@/hooks/add-to-favorites'
import useSetMediaStatus from '@/hooks/set-status'

type Props = {
    children?: ReactNode
}

const NavContext = createContext<TNavContext>(null)

const NavProvider = ({ children }: Props) => {
    const router = useRouter()
    const { t } = useTranslation()
    const selection = useSelectionContext()

    const drag = useDragContext()

    let actUpon = [...selection.selected]

    if (!actUpon.length) {
        actUpon = drag.dragging ? [drag.dragging] : []
    }

    const addToFavorites = useAddToFavorites(actUpon.map((element) => element?.id))
    const archive = useSetMediaStatus(actUpon, EMediumStatus.ARCHIVED)
    const trash = useSetMediaStatus(actUpon, EMediumStatus.TRASH)
    const moveToAll = useSetMediaStatus(actUpon, EMediumStatus.ALL)

    const defaultNav = router.route.split('/')[1].toUpperCase()

    const [active, setActive] = useState([Object.keys(ENavs).includes(defaultNav.toUpperCase()) ? defaultNav : ENavs.HOME])

    const getActiveItem = () => {
        const activeNav = navs.find((nav) => nav.items.find((item: TNavItem) => item.active))

        if (activeNav) {
            return activeNav.items.find((item: TNavItem) => item.active)
        }

        return navs[0].items[0]
    }

    const navs = [
        {
            id: ENavs.HOME,
            type: 'main-nav',
            items: [
                {
                    label: t(ETrans.PHOTO_PLURAL),
                    icon: Icons.mdiImageOutline,
                    href: '',
                    testId: 'nav-index',
                    onDrop: moveToAll,
                    canDrop: router.pathname !== '/' && router.pathname !== '/favorites',
                    type: ENavItemType.ALL
                },
                {
                    label: t(ETrans.ALBUM_PLURAL),
                    icon: Icons.mdiFolderOpenOutline,
                    href: 'albums',
                    type: ENavItemType.ALBUMS
                },
                {
                    label: t(ETrans.FAVORITES),
                    icon: Icons.mdiStar,
                    href: 'favorites',
                    testId: 'nav-favorites',
                    onDrop: addToFavorites,
                    type: ENavItemType.FAVORITES
                },
                {
                    label: t(ETrans.SHARING),
                    icon: Icons.mdiShareVariant,
                    href: 'sharing'
                },
                {
                    label: t(ETrans.ARCHIVE),
                    icon: Icons.mdiArchiveOutline,
                    href: 'archive',
                    onDrop: archive
                },
                {
                    label: t(ETrans.TRASH),
                    icon: Icons.mdiTrashCanOutline,
                    href: 'trash',
                    testId: 'nav-trash',
                    onDrop: trash
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
    ] as TNav[]

    const setActiveItem = (navs: TNav[]) => {
        const route = router.route.substring( 1, router.route.length)
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
        navs,
        getActiveItem,
        pathname: router.pathname
    }}
    >
        {children}
    </NavContext.Provider>
}

const useNavContext = () => {
    return useContext(NavContext)
}

export {
    NavProvider, useNavContext
}
