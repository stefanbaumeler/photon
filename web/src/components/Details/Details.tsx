import { useDetailsContext, useDialogContext, useSearchContext } from '@/providers'
import * as Icons from '@mdi/js'
import { Button, Detail, DetailsActions, Medium } from '../'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { formatDate, getRelativeTime } from '@/util/date'
import Icon from '@mdi/react'
import { useKeyboard } from '@/hooks/keyboard'
import bem from '../../util/bem'
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
    const index = media.map(({ id }) => id).indexOf(details.medium?.id)

    const slide = (direction: number) => {
        if (media[index + direction] && details.active) {
            details.open(media[index + direction].id)
        }
    }

    useKeyboard('keydown', 'ArrowLeft', () => {
        slide(-1)
    })

    useKeyboard('keydown', 'ArrowRight', () => {
        slide(1)
    })

    useKeyboard('keydown', 'Escape', () => {
        if (!dialog.active) {
            details.close()
        }
    })

    const OpenInfosButton = () => {
        return !details.infos && <Button
            testId="show-infos"
            hint={t(ETrans.SHOW_THING, {
                thing: t(ETrans.INFO_PLURAL)
            })}
            appearance={{
                text: 'light'
            }}
            onClick={details.openInfos}
            icon={Icons.mdiInformation}
        />
    }

    const ConditionalDateDetail = () => {
        return details.medium.dateTaken && <Detail
            icon={Icons.mdiCalendar}
            title={formatDate(details.medium.dateTaken, EDateFormat.LONG)}
            values={getRelativeTime(details.medium.dateTaken)}
        />
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
        ['first', index === 0],
        ['last', index === media.length - 1]
    ])

    const DetailsMedium = () => {
        return <>
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
        </>
    }

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
                    <Button
                        testId="close-details"
                        hint={t(ETrans.BACK)}
                        appearance={{
                            text: 'light'
                        }}
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
                <DetailsMedium />
            </div>
        </div>
        <aside
            data-testid="details-sidebar"
            className="details__sidebar"
        >
            <div className="toolbar">
                <div className="toolbar__section toolbar__section--left">
                    <Button
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
