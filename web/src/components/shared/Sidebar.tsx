'use client'

import { useNavContext } from '@/providers/NavProvider'
import { FocusOverlay } from '@/components/shared/FocusOverlay'
import { MainNav } from '@/components/shared/MainNav'

export const Sidebar = () => {
    const navs = useNavContext()

    return <aside
        className="sidebar"
        data-testid="sidebar"
    >
        <FocusOverlay />
        {navs?.navs.filter((nav) => navs.active.includes(nav.id)).map((nav, k) => <MainNav
            key={k}
            nav={nav}
        />)}
    </aside>
}
