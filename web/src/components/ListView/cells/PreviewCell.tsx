import Tippy from '@tippyjs/react'
import { Medium } from '@/components'
import { isMedium } from '@/util/is'
import { useListItemContext } from '../ListItemContext'
import { ListCell } from '../ListCell'

export const PreviewCell = () => {
    const { element } = useListItemContext()

    const cell = 'preview'

    const cover = isMedium(element) ? element : element.cover

    return <ListCell cell={cell}>
        <Tippy
            className="list-view__tip"
            followCursor={true}
            content={<Medium
                medium={cover}
                width={500}
                position={'top'}
            />}
            theme="transparent"
            zIndex={102}
        >
            <Medium
                medium={cover}
                width={50}
            />
        </Tippy>
    </ListCell>
}
