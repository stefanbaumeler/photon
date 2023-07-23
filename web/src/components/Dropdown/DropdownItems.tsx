import { TDropdownItem } from '@/types/app'
import { DropdownItem } from '@/components'
import { JSX } from 'react'

type Props = {
    items: (TDropdownItem | JSX.Element)[]
}

const DropdownItems = ({ items }: Props) => {
    return <>
        {items.map((item, k) => <DropdownItem
            item={item}
            key={k}
        />)}
    </>
}

export default DropdownItems
