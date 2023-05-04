import { TAlbum, TMedium } from '@photon/schema'
import { Check, ListItemActions, Medium } from '../'
import { formatDate } from '@/util/date'
import { useSelectionContext, useDetailsContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import Tippy from '@tippyjs/react'
import { useRouter } from 'next/router'
import { isMedium } from '@/util/is'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import useAddToFavorites from '@/hooks/add-to-favorites'
import useRemoveFromFavorites from '@/hooks/remove-from-favorites'

type Props = {
    element: TMedium | TAlbum
}

const ListItem = ({ element }: Props) => {
    const router = useRouter()
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const { t } = useTranslation()

    const addToFavorites = useAddToFavorites([element.id])
    const removeFromFavorites = useRemoveFromFavorites([element.id])

    const cover = isMedium(element) ? element : element.cover

    const select = () => {
        if (selection.mode === ESelectionMode.OFF) {
            selection.setMode(ESelectionMode.SELECT)
        }

        selection.toggle(element)
    }

    const open = () => {
        if (isMedium(element)) {
            details.open(element)
        } else {
            router.push(`albums/${element.id}`)
        }
    }

    const CategoryCells = () => {
        if (!isMedium(element)) {
            return <></>
        }

        return <td
            className="list-view__cell"
            onClick={element.favoredBy.length ? removeFromFavorites : addToFavorites}
        >
            <Icon
                path={element.favoredBy.length ? Icons.mdiStar : Icons.mdiStarOutline}
                size={1}
            />
        </td>
    }

    const AlbumCells = () => {
        if (isMedium(element)) {
            return <></>
        }

        return <>
            <td
                className="list-view__cell"
                onClick={open}
            >
                {`${element.albumMedia.length} `}
                {t(ETrans.ELEMENT, {
                    count: element.albumMedia.length
                })}
            </td>
        </>
    }

    const MediumCells = () => {
        if (!isMedium(element)) {
            return <></>
        }

        return <>
            <td
                className="list-view__cell"
                onClick={open}
            >
                {formatDate(element.dateTaken)}
            </td>
            <td
                className="list-view__cell"
                onClick={open}
            >
                {element.mimetype}
            </td>
        </>
    }

    return <tr
        className="list-view__row"
    >
        <td className="list-view__cell list-view__cell--select">
            <Check
                onClick={select}
                ready={true}
                checked={selection.isSelected(element)}
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
            {element.title}
        </td>
        <MediumCells />
        <AlbumCells />
        <td
            className="list-view__cell"
            onClick={open}
        >
            {`${element.owner.firstName} ${element.owner.lastName}`}
        </td>
        <td className="list-view__cell">
            <ListItemActions
                element={element}
            />
        </td>
    </tr>
}

export default ListItem
