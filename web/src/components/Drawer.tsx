import bem from 'web/src/util/bem'
import { ReactNode } from 'react'

type Props = {
    active: boolean
    side?: 'right' | 'bottom'
    children: ReactNode
}

export const Drawer = ({
    active, side = 'right', children
}: Props) => {
    const classes = bem('drawer', [
        ['active', active],
        ['right', side === 'right'],
        ['bottom', side === 'bottom']
    ])

    return <div className={classes}>
        {children}
    </div>
}
