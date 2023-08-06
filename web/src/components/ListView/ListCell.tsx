import { order, columns } from './columns'
import { isMedium } from '@/util/is'
import { useRouter } from 'next/router'
import { useDetailsContext } from '@/providers'
import { useListItemContext } from './ListItemContext'
import { useListContext } from './ListContext'
import { JSX, ReactNode } from 'react'

type Props = {
    cell: string
    children?: ReactNode
    shouldOpenOnClick?: boolean
    grow?: boolean
}

export const ListCell = ({
    cell, children, shouldOpenOnClick = true,
    grow
}: Props) => {
    const { headers } = useListContext()
    const router = useRouter()
    const details = useDetailsContext()
    const listItemContext = useListItemContext()

    if (!headers.includes(cell)) {
        return <></>
    }

    const open = () => {
        if (isMedium(listItemContext.element)) {
            details.open(listItemContext.element.id)
        } else {
            router.push(`albums/${listItemContext.element.id}`)
        }
    }

    const Tag = `t${listItemContext ? 'd' : 'h'}` as keyof JSX.IntrinsicElements

    return <Tag
        className="list-view__cell"
        onClick={shouldOpenOnClick && !!listItemContext ? open : undefined}
        style={{
            width: columns[cell].width,
            order: order(cell),
            flexGrow: grow && '1'
        }}
    >
        {children}
    </Tag>
}
