import { FocusOverlay, MainNav } from '..'
import { useNavContext } from '@/providers'

export const Sidebar = () => {
    const navs = useNavContext()

    return <aside className="sidebar">
        <FocusOverlay />
        {navs?.navs.filter((nav) => navs.active.includes(nav.id)).map((nav, k) => <MainNav
            key={k}
            nav={nav}
        />)}
    </aside>
}
