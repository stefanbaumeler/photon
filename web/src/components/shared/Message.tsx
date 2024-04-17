import { ReactNode } from 'react'
import bem from '@/util/bem'

type Props = {
    children: ReactNode
    fixed?: boolean
    danger?: boolean
}

export const Message = ({
    children, fixed = false, danger = false
}: Props) => {
    const classes = bem('message', [
        ['fixed', fixed],
        ['danger', danger]
    ])

    return <div className={classes}>
        {children}
    </div>
}
