import Icon from '@mdi/react'
import { TNav, TNavItem } from '@/types/app'
import { useNavContext, useSelectionContext } from '@/providers'
import Link from 'next/link'

type Props = {
    nav: TNav
}

export const MainNav = ({ nav }: Props) => {
    const navs = useNavContext()
    const selection = useSelectionContext()

    const click = (item: TNavItem) => {
        selection.clear()

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
                    <Link
                        href={`/${item.href || '#'}`}
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
                    </Link>
                </li>
            )}
        </ul>
    </nav>
}
