import { MainNav } from './index'
import { useNavContext } from '../providers'

export const Sidebar = () => {
    const navs = useNavContext()

    return <aside className="sidebar">
        {navs?.navs.filter((nav) => navs.active.includes(nav.id)).map((nav, k) => <MainNav
            key={k}
            nav={nav}
        />)}
    </aside>
}
