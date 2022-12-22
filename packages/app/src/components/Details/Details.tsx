import { useContext, useEffect, useMemo } from 'react'
import { DetailsContext, DialogContext } from '@/providers'
import * as Icons from '@mdi/js'
import { Detail, DetailsActions, IconButton, Medium } from '@/components'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import dynamic from 'next/dynamic'
import { formatDate, getRelativeTime } from '@/util/date'
import Icon from '@mdi/react'
import useKeyboard from '@/hooks/keyboard'
import bem from '@/util/bem'
import { useRouter } from 'next/router'
import { EDateFormat } from '@/types/app'
import { DetailsImageMeta } from './DetailsImageMeta'
import { DetailsVideoMeta } from './DetailsVideoMeta'

export const Details = () => {
    const { t } = useTranslation()

    const details = useContext(DetailsContext)
    const dialog = useContext(DialogContext)

    const router = useRouter()

    const idMedium = Array.isArray(router.query.idMedium) ? router.query.idMedium.join('') : router.query.idMedium

    useEffect(() => {
        if (idMedium) {
            const mediumToOpen = details.collection.find((medium) => medium.id === idMedium)
            if (mediumToOpen) {
                details.open(mediumToOpen)
            }
        }
    }, [details.collection])

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

    const ConditionalDateDetail = () => {
        if (details.medium.dateTaken) {
            return <Detail
                icon={Icons.mdiCalendar}
                title={formatDate(details.medium.dateTaken, EDateFormat.LONG)}
                values={getRelativeTime(details.medium.dateTaken)}
            />
        }

        return <></>
    }

    const Map = dynamic(() => import('./DetailsMap'), {
        ssr: false
    })

    const DetailsMap = useMemo(() => {
        if (!details.medium) {
            return <></>
        }

        return <>
            <Map
                lat={details.medium.lat}
                lng={details.medium.lng}
            />
        </>
    }, [details.medium])

    const classes = bem('details', [
        ['active', details.active],
        ['infos', details.infos]
    ])

    const containerClasses = bem('details__container', [
        // ['rotated', rotated]
    ])

    if (!details.medium || !Object.keys(details.medium).length) {
        return <></>
    }

    const previewClasses = bem('details__preview', [
        ['video', details.medium.mimetype?.startsWith('video')],
        ['first', details.collection.indexOf(details.medium) === 0],
        ['last', details.collection.indexOf(details.medium) === details.collection.length - 1]
    ])

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
                    <DetailsActions />
                    <OpenInfosButton />
                </div>
            </div>
            <div
                className={containerClasses}
                style={{
                    aspectRatio: `${details.medium.meta.width} / ${details.medium.meta.height}`
                }}
            >
                <Medium
                    priority={true}
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
                <DetailsImageMeta />
                <DetailsVideoMeta />
                {DetailsMap}
            </div>
        </aside>
    </div>
}
