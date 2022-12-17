import { TDropdownItem } from '@/types/app'
import bem from '@/util/bem'
import { ReactElement } from 'react'
import Tippy from '@tippyjs/react'

type Props = {
    items: TDropdownItem[]
    active: boolean
    children: ReactElement
    onClickOutside: () => void
    smallButton?: boolean
}

const Dropdown = ({
    items, active, children, onClickOutside, smallButton = false
}: Props) => {
    const DropdownItems = () => {
        return <>
            {items.map((item, k) => <li
                className="dropdown__item"
                key={k}
            >
                <button
                    data-cy={item.cy}
                    className="dropdown__button"
                    onClick={item.callback}
                >
                    {item.label}
                </button>
            </li>)}
        </>
    }

    const classes = bem('dropdown', [
        ['active', active]
    ])

    return <div className={classes}>
        <Tippy
            content={<div className="dropdown__container">
                <ul className="dropdown__list">
                    <DropdownItems />
                </ul>
            </div>}
            visible={active}
            theme="light"
            placement={'left'}
            zIndex={102}
            interactive={true}
            onClickOutside={onClickOutside}
            offset={[smallButton ? 43.5 : 51.5, smallButton ? -32 : -48]}
        >
            <div className="dropdown__toggle">
                {children}
            </div>
        </Tippy>

    </div>
}

export default Dropdown
