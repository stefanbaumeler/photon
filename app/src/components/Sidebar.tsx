import { MainNav } from '@/components'
import { useContext } from 'react'
import { NavContext } from '@/providers'

// Sync
// API
// Partner
// Defaults
// Import / Export
// Notifications

const Sidebar = () => {
    const navs = useContext(NavContext)

    return <aside className="sidebar">
        {navs?.navs.filter((nav) => navs.active.includes(nav.id)).map((nav, k) => <MainNav
            key={k}
            nav={nav}
        />)}
    </aside>
}

export default Sidebar
