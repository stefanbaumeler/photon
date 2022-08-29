import Icon from '@mdi/react'
import { TNav, TNavItem } from '@/types/app'
import { useContext } from 'react'
import { NavContext } from '@/contexts'
import Link from 'next/link'

type Props = {
    nav: TNav
}

const MainNav = ({ nav }: Props) => {
    const navs = useContext(NavContext)

    const click = (item: TNavItem) => {
        if (item.subNav) {
            navs.setActive([item.subNav])
        }
    }

    return <nav className={nav.type}>
        <ul className={`${nav.type}__list`}>
            {nav.items.map((item, key) =>
                <li
                    key={key}
                    className={`${nav.type}__item`}
                >
                    <Link href={`/${item.href || '#'}`}>
                        <a
                            className={`${nav.type}__link${item.active ? ` ${nav.type}__link--active` : ''}`}
                            onClick={() => click(item)}
                        >
                            <span className={`${nav.type}__icon`}>
                                <Icon
                                    path={item.icon}
                                    size={1}
                                />
                            </span>
                            <span className={`${nav.type}__label`}>
                                {item.label}
                            </span>
                        </a>
                    </Link>
                </li>
            )}
        </ul>
    </nav>
}

export default MainNav
