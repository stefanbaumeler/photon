import Icon from '@mdi/react'
import { TNav, TNavItem } from '@/types/app'
import { useNavContext, useSelectionContext } from '@/providers'
import Link from 'next/link'
import bem from '@/util/bem'

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
        <ul className={`${nav.type}__list`} >
            {nav.items.map((item, key) => {
                const itemClasses = bem(`${nav.type}__item`, [
                    ['drop', !!item.onDrop && item.canDrop !== false]
                ])

                return <li
                    key={key}
                    className={itemClasses}
                    onDragOver={(event) => {
                        event.preventDefault()
                    }}
                    onDrop={item.onDrop}
                >
                    <Link
                        data-testid={item.testId}
                        href={`/${item.href || '#'}`}
                        className={`${nav.type}__link${item.active ? ` ${nav.type}__link--active` : ''}`}
                        onClick={() => click(item)}
                    >
                        <span
                            className={`${nav.type}__icon`}
                        >
                            <Icon
                                path={item.icon}
                                size={1}
                            />
                        </span>
                        <span
                            className={`${nav.type}__label`}
                        >
                            {item.label}
                        </span>
                    </Link>
                </li>
            }
            )}
        </ul>
    </nav>
}
