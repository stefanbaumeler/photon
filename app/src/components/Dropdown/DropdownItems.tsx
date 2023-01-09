import { TDropdownItem } from '../../types/app'

type Props = {
    items: TDropdownItem[]
}

const DropdownItems = ({ items }: Props) => {
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
                {item.label}
            </button>
        </li>)}
    </>
}

export default DropdownItems
