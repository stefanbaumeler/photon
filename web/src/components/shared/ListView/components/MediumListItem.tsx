import { formatDate } from '@/util/date'
import { ESelectionMode, TMediumListItem } from '@/types/app'
import Tippy from '@tippyjs/react'
import { useEffect, useRef } from 'react'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { Check } from '@/components/shared/Check'
import { FavoriteControl } from '@/components/controls/FavoriteControl'
import { ListItemControls } from '@/components/control-groups/ListItemControls'
import { Medium } from '@/components/shared/Medium'
import Link from 'next/link'
import { getDetailsUrl } from '@/util/routing'
import { useParams, usePathname } from 'next/navigation'
import { useRotationContext } from '@/providers/RotationProvider'
export const MediumListItem = ({
    id, title, cover, dateTaken, mimetype, owner
}: TMediumListItem) => {
    const params = useParams()
    const pathname = usePathname()
    const album = Array.isArray(params.idAlbum) ? params.idAlbum[0] : params.idAlbum

    const selection = useSelectionContext()
    const {
        mediumToRotate, rotationRequest, loading
    } = useRotationContext()

    const src = useRef(0)

    useEffect(() => {
        if (!rotationRequest && loading) {
            src.current = src.current + 1
        }
    }, [id, src, rotationRequest, loading])

    const select = () => {
        if (selection.mode === ESelectionMode.OFF) {
            selection.setMode(ESelectionMode.SELECT)
        }

        selection.toggle(id)
    }

    const href = getDetailsUrl(pathname, id, album)

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
        >
            <Link
                href={href}
                className="list-view__link"
            >
                {mediumToRotate === id && rotationRequest ? null : <Tippy
                    className="list-view__tip"
                    followCursor
                    content={<Medium
                        updateHash={src.current}
                        medium={cover}
                        width={500}
                        position={'top'}
                        forceAspectRatio={true}
                    />}
                    theme="transparent"
                    zIndex={102}
                >
                    <Medium
                        testId="teaser-image"
                        medium={cover}
                        width={50}
                        updateHash={src.current}
                    />
                </Tippy>}
            </Link>
        </td>
        <td
            className="list-view__cell list-view__cell--title"
        >
            <Link
                href={href}
                className="list-view__link"
            >
                {title}
            </Link>
        </td>
        { dateTaken ? <td
            className="list-view__cell"
        >
            <Link
                href={href}
                className="list-view__link"
            >
                {formatDate(dateTaken)}
            </Link>
        </td> : null}
        {mimetype ? <td
            className="list-view__cell"
        >
            <Link
                href={href}
                className="list-view__link"
            >
                {mimetype}
            </Link>
        </td> : null}
        <td
            className="list-view__cell"
        >
            <Link
                href={href}
                className="list-view__link"
            >
                {`${owner.firstName} ${owner.lastName}`}
            </Link>
        </td>
        <td className="list-view__cell">
            <ListItemControls
                element={id}
                downloadElements={[id]}
            />
        </td>
    </tr>
}
