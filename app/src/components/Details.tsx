import { useContext, useEffect, useState } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Tippy from '@tippyjs/react'
import { useDeleteMedia } from '@/types/api'
import { useMedia } from '@/api/hooks'
import { Check, IconButton, Detail } from '@/components'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import dynamic from 'next/dynamic'

const Details = () => {
    const { t } = useTranslation()

    const {
        active, medium, collection,
        openDetails, closeDetails,
        openInfos, closeInfos, infos
    } = useContext(DetailsContext)

    const {
        openDialog, closeDialog
    } = useContext(DialogContext)

    const {
        addSelected, removeSelected, isSelected, isInSelectionMode
    } = useContext(SelectionContext)

    const select = () => {
        if (isSelected(medium)) {
            removeSelected(medium)
        }
        else {
            addSelected(medium)
        }
    }

    const { refetch } = useMedia()

    const [deleteMedium] = useDeleteMedia({
        variables: {
            ids: [medium.id]
        }
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            const index = collection.indexOf(medium)

            if (event.key === 'Escape') {
                closeDetails()
            }

            if (event.key === 'ArrowLeft') {
                if (collection[index - 1]) {
                    openDetails(collection[index - 1], collection)
                }
            }

            if (event.key === 'ArrowRight') {
                if (collection[index + 1]) {
                    openDetails(collection[index + 1], collection)
                }
            }
        }

        window.addEventListener('keydown', keydown)

        return () => {
            window.removeEventListener('keydown', keydown)
        }
    }, [collection, medium])

    const openAskDeleteDialog = () => {
        openDialog('Remove from Picchu and all synced devices?', [
            {
                label: t(ETrans.MOVE_TO_TRASH),
                action: closeDialog,
                type: 'secondary'
            },
            {
                label: t(ETrans.MOVE_TO_TRASH),
                action: confirmDeleteMedium
            }
        ])
    }

    const confirmDeleteMedium = () => {
        deleteMedium().then(() => {
            refetch().then(() => {
                closeDetails()
                closeDialog()
            })
        })
    }

    const download = () => {

    }

    const src = medium.filename_disk ? `http://localhost:2000/uploads/${medium.filename_disk}` : '#'

    const OpenInfosButton = () => {
        if (infos) {
            return <></>
        }

        return <IconButton
            hint={t(ETrans.SHOW_THING, {
                thing: t(ETrans.INFO_PLURAL)
            })}
            white={true}
            onClick={openInfos}
            icon={Icons.mdiInformation}
        />
    }

    const RightToolbar = () => {
        if (isInSelectionMode) {
            return <Tippy
                content={t(ETrans.SELECT)}
            >
                <Check
                    onClick={select}
                    ready={true}
                    checked={isSelected(medium)}
                    boxSize={48}
                    hover={true}
                />
            </Tippy>
        }

        return <>
            <IconButton
                href={src}
                hint={t(ETrans.DOWNLOAD)}
                white={true}
                onClick={download}
                download={medium.filename_download}
                external={true}
                icon={Icons.mdiTrayArrowDown}
            />
            <IconButton
                hint={t(ETrans.DELETE)}
                white={true}
                onClick={openAskDeleteDialog}
                icon={Icons.mdiTrashCanOutline}
            />
            <OpenInfosButton />
        </>
    }

    const getRelativeTime = (d1: Date, d2 = new Date()) => {
        const units: {
            [key: string]: number
        } = {
            year  : 24 * 60 * 60 * 1000 * 365,
            month : 24 * 60 * 60 * 1000 * 365 / 12,
            day   : 24 * 60 * 60 * 1000,
            hour  : 60 * 60 * 1000,
            minute: 60 * 1000,
            second: 1000
        }

        const rtf = new Intl.RelativeTimeFormat('en-US', {
            numeric: 'auto'
        })

        const elapsed = d1.getTime() - d2.getTime()

        for (const u in units) {
            if (Math.abs(elapsed) > units[u] || u === 'second') {
                return rtf.format(Math.round(elapsed / units[u]), u as Intl.RelativeTimeFormatUnit)
            }
        }
    }

    const ConditionalDateDetail = () => {
        if (medium.date_taken) {
            return <Detail
                icon={Icons.mdiCalendar}
                title={new Date(parseInt(medium.date_taken, 10)).toLocaleString('en-US')}
                values={getRelativeTime(new Date(parseInt(medium.date_taken, 10)))}
            />
        }

        return <></>
    }

    const Map = dynamic(() => import('@/components/DetailsMap'), {
        ssr: false
    })

    return <div className={`details${active ? ' details--active' : ''}${infos ? ' details--infos' : ''}`}>
        <div className="details__preview">
            <div className="toolbar toolbar--light">
                <div className="toolbar__section toolbar__section--left">
                    <IconButton
                        hint={t(ETrans.BACK)}
                        white={true}
                        onClick={closeDetails}
                        icon={Icons.mdiArrowLeft}
                    />
                </div>
                <div className="toolbar__section toolbar__section--right">
                    <RightToolbar />
                </div>
            </div>
            <div className="details__container">
                <div className="details__placeholder-container">
                    <img
                        className="details__placeholder"
                        src={`${src}?w=250`}
                        alt=""
                    />
                </div>
                <img
                    className={`details__image${!loading ? ' details__image--loaded' : ''}`}
                    src={src}
                    alt=""
                    onLoad={() => setLoading(false)}
                />
            </div>
        </div>
        <aside className="details__sidebar">
            <div className="toolbar">
                <div className="toolbar__section toolbar__section--left">
                    <IconButton
                        hint={t(ETrans.HIDE_THING, {
                            thing: t(ETrans.INFO_PLURAL)
                        })}
                        onClick={closeInfos}
                        icon={Icons.mdiArrowRight}
                    />
                </div>
            </div>
            <div className="details__sidebar-content">
                <ConditionalDateDetail />
                <Detail
                    icon={Icons.mdiCameraIris}
                    title={`${medium.camera_make} ${medium.camera_model}`}
                    values={[`f/${medium.f_number}`, `${medium.iso}`]}
                />
                <Detail
                    icon={Icons.mdiMapMarker}
                    title={`${medium.camera_make} ${medium.camera_model}`}
                    values={[`f/${medium.f_number}`, `${medium.iso}`]}
                />
                <Map
                    lat={medium.lat}
                    lng={medium.lng}
                />
            </div>
        </aside>
    </div>
}

export default Details
