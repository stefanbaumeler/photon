import { TMedium } from '@photon/schema'
import { Check, ListItemActions, Medium } from '../'
import { formatDate } from '@/util/date'
import { useSelectionContext, useDetailsContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import Tippy from '@tippyjs/react'

type Props = {
    medium: TMedium
}

const ListItem = ({ medium }: Props) => {
    const selection = useSelectionContext()
    const details = useDetailsContext()

    const select = () => {
        if (selection.mode === ESelectionMode.OFF) {
            selection.setMode(ESelectionMode.SELECT)
        }

        selection.toggle(medium)
    }

    const open = () => {
        details.open(medium)
    }

    return <tr
        className="list-view__row"
    >
        <td className="list-view__cell list-view__cell--select">
            <Check
                onClick={select}
                ready={true}
                checked={selection.isSelected(medium)}
                round={false}
                iconSize={1.125}
                borderColor="#888899"
                boxSize={40}
                blankHoverColor="#546119"
            />
        </td>
        <td
            className="list-view__cell"
            onClick={open}
        >
            <Tippy
                className="list-view__tip"
                followCursor={true}
                content={<Medium
                    medium={medium}
                    width={500}
                    position={'top'}
                />}
                theme="transparent"
                zIndex={102}
            >
                <Medium
                    medium={medium}
                    width={50}
                />
            </Tippy>
        </td>
        <td
            className="list-view__cell list-view__cell--title"
            onClick={open}
        >
            {medium.title}
        </td>
        <td
            className="list-view__cell"
            onClick={open}
        >
            {formatDate(medium.dateTaken)}
        </td>
        <td
            className="list-view__cell"
            onClick={open}
        >
            {medium.mimetype}
        </td>
        <td
            className="list-view__cell"
            onClick={open}
        >
            Stefan Baumeler
        </td>
        <td className="list-view__cell">
            <ListItemActions
                medium={medium}
            />
        </td>
    </tr>
}

export default ListItem
