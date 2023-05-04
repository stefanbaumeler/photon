import bem from '@/util/bem'
import { useDragContext } from '@/providers'

export const DragOverlay = () => {
    const drag = useDragContext()

    const classes = bem('drag-overlay', [
        ['active', !!drag.dragging]
    ])

    return <div className={classes}>
    </div>
}
