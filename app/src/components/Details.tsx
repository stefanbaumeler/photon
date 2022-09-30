import { useContext, useEffect, useState } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Tippy from '@tippyjs/react'
import { useDeleteMedia } from '@/types/api'
import { useMedia } from '@/api/hooks'
import { Check, IconButton, Detail } from '@/components'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import dynamic from 'next/dynamic'

const Details = () => {
    const { t } = useTranslation()

    const details = useContext(DetailsContext)
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)

    const select = () => {
        selection.toggle(details.medium)
    }

    const { refetch } = useMedia()

    const [deleteMedium] = useDeleteMedia({
        variables: {
            ids: [details.medium.id]
        }
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const leftRight = (event: KeyboardEvent) => {
            const index = details.collection.indexOf(details.medium)

            if (event.key === 'ArrowLeft') {
                if (details.collection[index - 1]) {
                    details.open(details.collection[index - 1], details.collection)
                }
            }

            if (event.key === 'ArrowRight') {
                if (details.collection[index + 1]) {
                    details.open(details.collection[index + 1], details.collection)
                }
            }
        }

        window.addEventListener('keydown', leftRight)

        return () => {
            window.removeEventListener('keydown', leftRight)
        }
    }, [details.collection, details.medium])

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !dialog.active) {
                details.close()
            }
        }

        window.addEventListener('keydown', keydown)

        return () => {
            window.removeEventListener('keydown', keydown)
        }
    }, [dialog.active])

    const openAskDeleteDialog = () => {
        dialog.open({
            title: t(ETrans.MOVE_TO_TRASH),
            text: 'Remove from Picchu and all synced devices?',
            buttons: [
                {
                    label: t(ETrans.MOVE_TO_TRASH),
                    action: dialog.close,
                    type: 'secondary'
                },
                {
                    label: t(ETrans.MOVE_TO_TRASH),
                    action: confirmDeleteMedium
                }
            ]
        })
    }

    const confirmDeleteMedium = () => {
        deleteMedium().then(() => {
            refetch().then(() => {
                details.close()
                dialog.close()
            })
        })
    }

    const download = () => {

    }

    const src = details.medium.filenameDisk ? `http://localhost:2000/uploads/${details.medium.filenameDisk}` : '#'

    const OpenInfosButton = () => {
        if (details.infos) {
            return <></>
        }

        return <IconButton
            hint={t(ETrans.SHOW_THING, {
                thing: t(ETrans.INFO_PLURAL)
            })}
            white={true}
            onClick={details.openInfos}
            icon={Icons.mdiInformation}
        />
    }

    const RightToolbar = () => {
        if (selection.isInSelectionMode) {
            return <Tippy
                content={t(ETrans.SELECT)}
            >
                <Check
                    onClick={select}
                    ready={true}
                    checked={selection.isSelected(details.medium)}
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
                download={details.medium.filenameDownload}
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

    return <div className={`details${details.active ? ' details--active' : ''}${details.infos ? ' details--infos' : ''}`}>
        <div className="details__preview">
            <div className="toolbar toolbar--light">
                <div className="toolbar__section toolbar__section--left">
                    <IconButton
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
