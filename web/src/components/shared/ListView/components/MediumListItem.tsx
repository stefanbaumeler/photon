import { Check, Medium } from '@/components'
import { ListItemControls } from '@/components/control-groups'
import { formatDate } from '@/util/date'
import { useSelectionContext, useDetailsContext } from '@/providers'
import { ESelectionMode, TMediumListItem } from '@/types/app'
import Tippy from '@tippyjs/react'
import { useEffect, useRef } from 'react'
import { FavoriteControl } from '@/components/controls'
export const MediumListItem = ({
    id, title, cover, dateTaken, mimetype, owner
}: TMediumListItem) => {
    const selection = useSelectionContext()
    const details = useDetailsContext()

    // const [updatedSource, setUpdatedSource] = useState(0)

    const src = useRef(0)

    useEffect(() => {
        if (id === details.medium?.id) {
            src.current = src.current + 1
        }
    }, [id, details.medium?.id, src, details.rotationRequest])

    const select = () => {
        if (selection.mode === ESelectionMode.OFF) {
            selection.setMode(ESelectionMode.SELECT)
        }

        selection.toggle(id)
    }

    const open = () => {
        if (cover) {
            details.open({
                ...cover,
                id
            })
        }
    }

    return <tr
        className="list-view__row"
        data-testid="teaser"
    >
        <td className="list-view__cell list-view__cell--select">
            <Check
                onClick={select}
                ready
                checked={selection.isSelected(id)}
                round={false}
                iconSize={1.125}
                borderColor="#888899"
                boxSize={40}
                blankHoverColor="#546119"
                testId="teaser-check"
            />
        </td>
        <td
            className="list-view__cell"
        >
            <FavoriteControl media={[id]} />
        </td>
        <td
            className="list-view__cell list-view__cell--image"
            onClick={open}
        >
            <Tippy
                className="list-view__tip"
                followCursor
                content={<Medium
                    updateHash={src.current}
                    medium={cover}
                    width={500}
                    position={'top'}
                />}
                theme="transparent"
                zIndex={102}
            >
                <Medium
                    testId="teaser-image"
                    updateHash={src.current}
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
        { dateTaken ? <td
            className="list-view__cell"
            onClick={open}
        >
            {formatDate(dateTaken)}
        </td> : null}
        {mimetype ? <td
            className="list-view__cell"
            onClick={open}
        >
            {mimetype}
        </td> : null}
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
