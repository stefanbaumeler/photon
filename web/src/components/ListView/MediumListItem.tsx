import { Check, Medium, TMediumListItem } from '@/components'
import { ListItemControls } from '@/components/control-groups'
import { formatDate } from '@/util/date'
import { useSelectionContext, useDetailsContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import Tippy from '@tippyjs/react'
import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { useAddToFavorites, useRemoveFromFavorites } from '@/hooks'

const MediumListItem = ({
    id, title, cover, favoredBy, dateTaken, mimetype, owner
}: TMediumListItem) => {
    const selection = useSelectionContext()
    const details = useDetailsContext()

    const addToFavorites = useAddToFavorites([id])
    const removeFromFavorites = useRemoveFromFavorites([id])

    const select = () => {
        if (selection.mode === ESelectionMode.OFF) {
            selection.setMode(ESelectionMode.SELECT)
        }

        selection.toggle(id)
    }

    const open = () => {
        details.open(id)
    }

    const CategoryCells = () => {
        return favoredBy !== undefined ? <td
            className="list-view__cell"
            onClick={favoredBy ? removeFromFavorites : addToFavorites}
        >
            <Icon
                path={favoredBy ? Icons.mdiStar : Icons.mdiStarOutline}
                size={1}
            />
        </td> : undefined
    }

    const MediumCells = () => {
        return <>
            { dateTaken ? <td
                className="list-view__cell"
                onClick={open}
            >
                {formatDate(dateTaken)}
            </td> : undefined}
            {mimetype ? <td
                className="list-view__cell"
                onClick={open}
            >
                {mimetype}
            </td> : undefined}
        </>
    }

    return <tr
        className="list-view__row"
    >
        <td className="list-view__cell list-view__cell--select">
            <Check
                onClick={select}
                ready={true}
                checked={selection.isSelected(id)}
                round={false}
                iconSize={1.125}
                borderColor="#888899"
                boxSize={40}
                blankHoverColor="#546119"
                testId="list-check"
            />
        </td>
        <CategoryCells />
        <td
            className="list-view__cell list-view__cell--image"
            onClick={open}
        >
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
        </td>
        <td
            className="list-view__cell list-view__cell--title"
            onClick={open}
        >
            {title}
        </td>
        <MediumCells />
        <td
            className="list-view__cell"
            onClick={open}
        >
            {`${owner.firstName} ${owner.lastName}`}
        </td>
        <td className="list-view__cell">
            <ListItemControls
                element={id}
                downloadElements={[id]}
            />
        </td>
    </tr>
}

export default MediumListItem
