import { Check, Medium, TAlbumListItem } from '@/components'
import { ListItemControls } from '@/components/control-groups'
import { useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import Tippy from '@tippyjs/react'
import { useRouter } from 'next/router'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'

const AlbumListItem = ({
    id, title, cover, owner, albumMedia
}: TAlbumListItem) => {
    const router = useRouter()
    const selection = useSelectionContext()
    const { t } = useTranslation()

    const select = () => {
        if (selection.mode === ESelectionMode.OFF) {
            selection.setMode(ESelectionMode.SELECT)
        }

        selection.toggle(id)
    }

    const open = () => {
        router.push(`albums/${id}`)
    }

    const AlbumCells = () => {
        return albumMedia?.length ? <>
            <td
                className="list-view__cell"
                onClick={open}
            >
                {`${albumMedia.length} `}
                {t(ETrans.ELEMENT, {
                    count: albumMedia.length
                })}
            </td>
        </> : undefined
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
        <AlbumCells />
        <td
            className="list-view__cell"
            onClick={open}
        >
            {`${owner.firstName} ${owner.lastName}`}
        </td>
        <td className="list-view__cell">
            <ListItemControls
                album
                element={id}
                downloadElements={albumMedia}
            />
        </td>
    </tr>
}

export default AlbumListItem
