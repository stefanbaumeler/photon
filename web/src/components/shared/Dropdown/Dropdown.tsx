import { TDropdownItem } from '@/types/app'
import bem from '@/util/bem'
import { JSX, ReactElement } from 'react'
import Tippy from '@tippyjs/react'
import { DropdownItems } from '.'

type Props = {
    items: (TDropdownItem | JSX.Element)[]
    active: boolean
    children: ReactElement
    onClickOutside: () => void
    smallButton?: boolean
}

export const Dropdown = ({
    items, active, children, onClickOutside, smallButton = false
}: Props) => {
    const classes = bem('dropdown', [
        ['active', active]
    ])

    return <div className={classes}>
        <Tippy
            content={<div className="dropdown__container">
                <ul className="dropdown__list">
                    <DropdownItems items={items} />
                </ul>
            </div>}
            visible={active}
            theme="light"
            placement={'left'}
            zIndex={102}
            interactive
            onClickOutside={onClickOutside}
            offset={[smallButton ? 43.5 : 51.5, smallButton ? -32 : -48]}
        >
            <div className="dropdown__toggle">
                {children}
            </div>
        </Tippy>

    </div>
}

export { DropdownItem } from '.'
