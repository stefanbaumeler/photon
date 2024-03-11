import { TDropdownItem } from '@/types/app'
import { DropdownItem } from '../index'
import { JSX } from 'react'

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
