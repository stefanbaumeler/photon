import bem from '@/util/bem'
import { ReactNode } from 'react'

type Props = {
    active: boolean
    children: ReactNode
}

export const Drawer = ({
    active, children
}: Props) => {
    const classes = bem('drawer', [
        ['active', active]
    ])

    return <div className={classes}>
        {children}
    </div>
}
