import { useEffect } from 'react'
import { useDetailsContext, useDialogContext, useSearchContext } from '@/providers'
import * as Icons from '@mdi/js'
import { Detail, DetailsActions, IconButton, Medium } from '../'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { formatDate, getRelativeTime } from '@/util/date'
import Icon from '@mdi/react'
import useKeyboard from '../../hooks/keyboard'
import bem from '../../util/bem'
import { useRouter } from 'next/router'
import { EDateFormat } from '@/types/app'
import { DetailsImageMeta } from './DetailsImageMeta'
import { DetailsVideoMeta } from './DetailsVideoMeta'
import { DetailsDescription } from './DetailsDescription'
import { DetailsAlbums } from './DetailsAlbums'
import { DetailsMap } from './DetailsMap'
import { DetailsSection } from './DetailsSection'
import { DetailsOwner } from './DetailsOwner'
import { DetailsShares } from './DetailsShares'

export const Details = () => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const dialog = useDialogContext()
    const { hits: media } = useSearchContext()

    const router = useRouter()

    const idMedium = Array.isArray(router.query.idMedium) ? router.query.idMedium.join('') : router.query.idMedium

    useEffect(() => {
        if (idMedium) {
            const mediumToOpen = media.find((medium) => medium.id === idMedium)
            if (mediumToOpen) {
                details.open(mediumToOpen)
            }
        }
    }, [media, idMedium])

    const slide = (direction: number) => {
        const index = media.indexOf(details.medium)

        if (media[index + direction] && details.active) {
            details.open(media[index + direction])
        }
    }

    useKeyboard('keydown', 'ArrowLeft', () => {
        slide(-1)
    }, [media, details.medium])

    useKeyboard('keydown', 'ArrowRight', () => {
        slide(1)
    }, [media, details.medium])

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
            testId="show-infos"
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
        ['first', media.indexOf(details.medium) === 0],
        ['last', media.indexOf(details.medium) === media.length - 1]
    ])

    return <div
        className={classes}
        data-testid="details"
    >
        <div className={previewClasses}>
            <button
                data-testid="prev-medium"
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
                data-testid="next-medium"
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
                        testId="close-details"
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
                    placeholder={true}
                    priority={true}
                    medium={details.medium}
                    width={details.medium.meta.width / 20}
                />
                <Medium
                    priority={true}
                    testId="details-image"
                    medium={details.medium}
                    width={details.medium.meta.width / 2}
                />
            </div>
        </div>
        <aside
            data-testid="details-sidebar"
            className="details__sidebar"
        >
            <div className="toolbar">
                <div className="toolbar__section toolbar__section--left">
                    <IconButton
                        testId="hide-infos"
                        hint={t(ETrans.HIDE_THING, {
                            thing: t(ETrans.INFO_PLURAL)
                        })}
                        onClick={details.closeInfos}
                        icon={Icons.mdiArrowRight}
                    />
                </div>
            </div>
            <div className="details__sidebar-content">
                <DetailsDescription />
                <DetailsAlbums />
                <DetailsSection title={t(ETrans.DETAILS)}>
                    <ConditionalDateDetail />
                    <DetailsImageMeta />
                    <DetailsVideoMeta />
                </DetailsSection>
                <DetailsOwner />
                <DetailsShares />
                <DetailsMap />
            </div>
        </aside>
    </div>
}
