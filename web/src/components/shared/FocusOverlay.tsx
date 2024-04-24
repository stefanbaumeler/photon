'use client'

import bem from '@/util/bem'
import { useDragContext } from '@/providers/DragProvider'

export const FocusOverlay = () => {
    const drag = useDragContext()

    const classes = bem('focus-overlay', [
        ['active', !!drag.dragging]
    ])

    return <div className={classes}></div>
}
