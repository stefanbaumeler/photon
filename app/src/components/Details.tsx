import { useContext, useEffect, useState } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Tippy from '@tippyjs/react'
import { Check, Detail, IconButton, Dropdown } from '@/components'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import dynamic from 'next/dynamic'
import { ESelectionMode } from '@/types/app'
import { getRelativeTime } from '@/util/date'
import Icon from '@mdi/react'
import useKeyboard from '@/hooks/keyboard'
import useRotate from '@/hooks/rotate'
import bem from '@/util/bem'
import useDeleteMediaDialog from '@/dialogs/delete-media'
import { useRouter } from 'next/router'

const Details = () => {
    const { t } = useTranslation()

    const details = useContext(DetailsContext)
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const router = useRouter()
    const rotate = useRotate()
    const deleteMediaDialog = useDeleteMediaDialog()

    const [loading, setLoading] = useState(true)

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

        if (details.collection[index + direction]) {
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
        details.close()
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
                callback: deleteMediaDialog
            },
            {
                label: t(ETrans.ROTATE_RIGHT),
                callback: rotate
            }
        ]

        const [moreActive, setMoreActive] = useState(false)

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

    const imageClasses = bem('details__image', [
        ['loaded', !loading]
    ])

    const containerClasses = bem('details__container', [
        // ['rotated', rotated]
    ])

    return <div
        className={classes}
        data-cy="details"
    >
        <div className="details__preview">

            <button
                data-cy="prev-medium"
                className="details__button details__button--prev"
                onClick={() => slide(-1)}
            >
                <Icon
                    path={Icons.mdiChevronLeft}
                    size={1.75}
                />
            </button>
            <button
                data-cy="next-medium"
                className="details__button details__button--next"
                onClick={() => slide(1)}
            >
                <Icon
                    path={Icons.mdiChevronRight}
                    size={1.75}
                />
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
            <div className={containerClasses}>
                <div className="details__placeholder-container">
                    <img
                        className="details__placeholder"
                        src={`${src}?w=250`}
                        alt=""
                    />
                </div>
                <img
                    data-cy="details-image"
                    className={imageClasses}
                    src={src}
                    alt=""
                    onLoad={() => setLoading(false)}
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
                <Detail
                    icon={Icons.mdiCameraIris}
                    title={`${details.medium.cameraMake} ${details.medium.cameraModel}`}
                    values={[`f/${details.medium.fNumber}`, `${details.medium.iso}`]}
                />
                <Detail
                    icon={Icons.mdiMapMarker}
                    title={`${details.medium.cameraMake} ${details.medium.cameraModel}`}
                    values={[`f/${details.medium.fNumber}`, `${details.medium.iso}`]}
                />
                <Map
                    lat={details.medium.lat}
                    lng={details.medium.lng}
                />
            </div>
        </aside>
    </div>
}

export default Details
