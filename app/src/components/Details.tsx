import { useContext, useEffect, useState } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Tippy from '@tippyjs/react'
import { useDeleteMedia } from '@/types/api'
import { useMedia } from '@/api/hooks'
import { Check, Detail, IconButton } from '@/components'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import dynamic from 'next/dynamic'
import { ESelectionMode } from '@/types/app'
import { getRelativeTime } from '@/util/date'
import Icon from '@mdi/react'

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

    const prev = () => {
        const index = details.collection.indexOf(details.medium)

        if (details.collection[index - 1]) {
            details.open(details.collection[index - 1], details.collection)
        }
    }

    const next = () => {
        const index = details.collection.indexOf(details.medium)

        if (details.collection[index + 1]) {
            details.open(details.collection[index + 1], details.collection)
        }
    }

    useEffect(() => {
        const leftRight = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                prev()
            }

            if (event.key === 'ArrowRight') {
                next()
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
        if (selection.mode === ESelectionMode.SELECT) {
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
                href={`${src}?download=true`}
                hint={t(ETrans.DOWNLOAD)}
                white={true}
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

            <button
                className="details__button details__button--prev"
                onClick={prev}
            >
                <Icon
                    path={Icons.mdiChevronLeft}
                    size={1.75}
                />
            </button>
            <button
                className="details__button details__button--next"
                onClick={next}
            >
                <Icon
                    path={Icons.mdiChevronRight}
                    size={1.75}
                />
            </button>
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
