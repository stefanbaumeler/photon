import bem from '@/util/bem'
import { useDragContext } from '@/providers'
import { useSearchBox } from 'react-instantsearch-hooks-web'

export const FocusOverlay = () => {
    const drag = useDragContext()
    const search = useSearchBox()

    console.log(search.query)

    const classes = bem('focus-overlay', [
        ['active', !!drag.dragging]
    ])

    return <div className={classes}>
    </div>
}
