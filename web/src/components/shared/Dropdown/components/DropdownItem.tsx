import { TDropdownItem } from '@/types/app'
import Icon from '@mdi/react'
import { JSX, ReactNode } from 'react'

type Props = {
    item: TDropdownItem | JSX.Element
}

export const DropdownItem = ({ item }: Props) => {
    const isDropdownItem = (element: TDropdownItem | ReactNode): element is TDropdownItem  => {
        const asDropdownItem = element as TDropdownItem

        return !!asDropdownItem.label
    }

    if (!isDropdownItem(item)) {
        return item
    }

    return <li
        className="dropdown__item"
    >
        <button
            data-testid={item.testId}
            className="dropdown__button"
            onClick={item.callback}
        >
            {item.icon ? <Icon
                className="dropdown__icon"
                path={item.icon}
                size={1}
            /> : null}
            <span className="dropdown__label">
                {item.label}
            </span>
            {item.shortcut ? <span
                className="dropdown__shortcut"
            >
                {item.shortcut}
            </span> : null}
        </button>
    </li>
}
