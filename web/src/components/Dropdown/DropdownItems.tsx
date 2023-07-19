import { TDropdownItem } from '@/types/app'
import Icon from '@mdi/react'

type Props = {
    items: TDropdownItem[]
}

const DropdownItems = ({ items }: Props) => {
    const ConditionalIcon = ({ item }: { item: TDropdownItem }) => {
        if (!item.icon) {
            return <></>
        }

        return <Icon
            className="dropdown__icon"
            path={item.icon}
            size={1}
        />
    }
    return <>
        {items.map((item, k) => <li
            className="dropdown__item"
            key={k}
        >
            <button
                data-testid={item.testId}
                className="dropdown__button"
                onClick={item.callback}
            >
                <ConditionalIcon item={item} />
                <span className="dropdown__label">
                    {item.label}
                </span>
            </button>
        </li>)}
    </>
}

export default DropdownItems
