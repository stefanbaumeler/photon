import { TDropdownItem } from '@/types/app'
import { JSX } from 'react'
import { DropdownItem } from '@/components/shared/Dropdown/components/DropdownItem'

type Props = {
    items: (TDropdownItem | JSX.Element)[]
}

export const DropdownItems = ({ items }: Props) => {
    return <>
        {items.map((item, k) => <DropdownItem
            item={item}
            key={k}
        />)}
    </>
}
