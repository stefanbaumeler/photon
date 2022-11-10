import { useContext, useEffect, useState } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Tippy from '@tippyjs/react'
import { Check, Detail, IconButton, Dropdown } from '@/components'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import dynamic from 'next/dynamic'
import { EMediumStatus, ESelectionMode } from '@/types/app'
import { getRelativeTime } from '@/util/date'
import Icon from '@mdi/react'
import useKeyboard from '@/hooks/keyboard'
import useRotate from '@/hooks/rotate'
import bem from '@/util/bem'
import useDeleteMediaDialog from '@/dialogs/delete-media'
import { useRouter } from 'next/router'
import useSetMediaStatus from '@/hooks/set-status'
import useMoveToTrashDialog from '@/dialogs/move-to-trash'
import useRestoreMediaDialog from '@/dialogs/restore-media'
import { Medium } from '@/components/Medium'
import { TImageMeta } from '@/types/api'

const Details = () => {
    const { t } = useTranslation()

    const details = useContext(DetailsContext)
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const router = useRouter()
    const rotate = useRotate()
    const archive = useSetMediaStatus(details.medium.status === EMediumStatus.ARCHIVED ? EMediumStatus.DEFAULT : EMediumStatus.ARCHIVED)
    const moveToTrashDialog = useMoveToTrashDialog()
    const deleteMediaDialog = useDeleteMediaDialog()
    const restoreMediaDialog = useRestoreMediaDialog()

    const idMedium = Array.isArray(router.query.idMedium) ? router.query.idMedium.join('') : router.query.idMedium

    useEffect(() => {
        if (idMedium) {
            const mediumToOpen = details.collection.find((medium) => medium.id === idMedium)
            if (mediumToOpen) {
                details.open(mediumToOpen)
            }
        }
    }, [details.collection])

    const select = () => {
        selection.toggle(details.medium)
    }

    const slide = (direction: number) => {
        const index = details.collection.indexOf(details.medium)

        if (details.collection[index + direction] && details.active) {
            details.open(details.collection[index + direction])
        }
    }

    useKeyboard('keydown', 'ArrowLeft', () => {
        slide(-1)
    }, [details.collection, details.medium])

    useKeyboard('keydown', 'ArrowRight', () => {
        slide(1)
    }, [details.collection, details.medium])

    useKeyboard('keydown', 'Escape', () => {
        if (!dialog.active) {
            details.close()
        }
    }, [dialog.active])

    const src = details.medium.filenameDisk ? `${process.env.NEXT_PUBLIC_UPLOADS_DIR}${details.medium.filenameDisk}` : '#'

    const OpenInfosButton = () => {
        if (details.infos) {
            return <></>
        }

        return <IconButton
            cy="show-infos"
            hint={t(ETrans.SHOW_THING, {
                thing: t(ETrans.INFO_PLURAL)
            })}
            white={true}
            onClick={details.openInfos}
            icon={Icons.mdiInformation}
        />
    }

    const RightToolbar = () => {
        if (selection.mode === ESelectionMode.SELECT) {
            return <Tippy
                content={t(ETrans.SELECT)}
            >
                <Check
                    cy="details-select"
                    onClick={select}
                    ready={true}
                    checked={selection.isSelected(details.medium)}
                    boxSize={48}
                    hover={true}
                />
            </Tippy>
        }

        const moreItems = [
            {
                label: t(ETrans.DELETE),
                callback: moveToTrashDialog
            },
            {
                label: t(ETrans.ROTATE_LEFT),
                callback: rotate
            },
            {
                label: details.medium.status === EMediumStatus.ARCHIVED ? t(ETrans.UNARCHIVE) : t(ETrans.MOVE_TO_ARCHIVE),
                callback: archive
            }
        ]

        const [moreActive, setMoreActive] = useState(false)

        const RegularActions = () => {
            return <>
                <IconButton
                    href={`${src}?download=true`}
                    hint={t(ETrans.DOWNLOAD)}
                    white={true}
                    icon={Icons.mdiTrayArrowDown}
                />
                <Dropdown
                    items={moreItems}
                    active={moreActive}
                    onClickOutside={() => setMoreActive(false)}
                >
                    <IconButton
                        hint={t(ETrans.MORE_OPTIONS)}
                        icon={Icons.mdiDotsVertical}
                        white={true}
                        onClick={() => setMoreActive(!moreActive)}
                    />
                </Dropdown>
            </>
        }

        const TrashActions = () => {
            return <>
                <IconButton
                    label={t(ETrans.DELETE)}
                    onClick={deleteMediaDialog}
                    icon={Icons.mdiDeleteForever}
                    white={true}
                />
                <IconButton
                    label={t(ETrans.RESTORE)}
                    onClick={restoreMediaDialog}
                    icon={Icons.mdiDeleteRestore}
                    white={true}
                />
            </>
        }

        const Actions = () => {
            if (router.pathname === '/trash') {
                return <TrashActions />
            }
            else {
                return <RegularActions />
            }
        }

        return <>
            <Actions />
            <OpenInfosButton />
        </>
    }

    const ConditionalDateDetail = () => {
        if (details.medium.dateTaken) {
            return <Detail
                icon={Icons.mdiCalendar}
                title={new Date(parseInt(details.medium.dateTaken, 10)).toLocaleString('en-US')}
                values={getRelativeTime(new Date(parseInt(details.medium.dateTaken, 10)))}
            />
        }

        return <></>
    }

    const Map = dynamic(() => import('@/components/DetailsMap'), {
        ssr: false
    })

    const classes = bem('details', [
        ['active', details.active],
        ['infos', details.infos]
    ])

    const containerClasses = bem('details__container', [
        // ['rotated', rotated]
    ])

    const previewClasses = bem('details__preview', [
        ['video', details.medium.mimetype?.startsWith('video')],
        ['first', details.collection.indexOf(details.medium) === 0],
        ['last', details.collection.indexOf(details.medium) === details.collection.length - 1]
    ])

    const ImageMeta = () => {
        const meta = details.medium.meta as TImageMeta
        return <>
            <Detail
                icon={Icons.mdiCameraIris}
                title={`${meta.cameraMake} ${meta.cameraModel}`}
                values={[`f/${meta.fNumber}`, `${meta.iso}`]}
            />
            <Detail
                icon={Icons.mdiMapMarker}
                title={`${meta.cameraMake} ${meta.cameraModel}`}
                values={[`f/${meta.fNumber}`, `${meta.iso}`]}
            />
        </>
    }

    const VideoMeta = () => {
        return <></>
    }

    const Meta = () => {
        if (details.medium.mimetype?.startsWith('image')) {
            return <ImageMeta />
        }

        if (details.medium.mimetype?.startsWith('image')) {
            return <VideoMeta />
        }
    }

    if (!details.medium || !Object.keys(details.medium).length) {
        return <></>
    }

    return <div
        className={classes}
        data-cy="details"
    >
        <div className={previewClasses}>
            <button
                data-cy="prev-medium"
                className="details__button details__button--prev"
                onClick={() => slide(-1)}
            >
                <div className="details__button-icon">
                    <Icon
                        path={Icons.mdiChevronLeft}
                        size={1.75}
                    />
                </div>
            </button>
            <button
                data-cy="next-medium"
                className="details__button details__button--next"
                onClick={() => slide(1)}
            >
                <div className="details__button-icon">
                    <Icon
                        path={Icons.mdiChevronRight}
                        size={1.75}
                    />
                </div>
            </button>
            <div className="toolbar toolbar--light">
                <div className="toolbar__section toolbar__section--left">
                    <IconButton
                        cy="close-details"
                        hint={t(ETrans.BACK)}
                        white={true}
                        onClick={details.close}
                        icon={Icons.mdiArrowLeft}
                    />
                </div>
                <div className="toolbar__section toolbar__section--right">
                    <RightToolbar />
                </div>
            </div>
            <div
                className={containerClasses}
                style={{
                    aspectRatio: `${details.medium.meta.width} / ${details.medium.meta.height}`
                }}
            >
                <Medium
                    cy="details-image"
                    medium={details.medium}
                    width={details.medium.meta.width}
                />
            </div>
        </div>
        <aside
            data-cy="details-sidebar"
            className="details__sidebar"
        >
            <div className="toolbar">
                <div className="toolbar__section toolbar__section--left">
                    <IconButton
                        cy="hide-infos"
                        hint={t(ETrans.HIDE_THING, {
                            thing: t(ETrans.INFO_PLURAL)
                        })}
                        onClick={details.closeInfos}
                        icon={Icons.mdiArrowRight}
                    />
                </div>
            </div>
            <div className="details__sidebar-content">
                <ConditionalDateDetail />
                <Meta />
                <Map
                    lat={details.medium.lat}
                    lng={details.medium.lng}
                />
            </div>
        </aside>
    </div>
}

export default Details
