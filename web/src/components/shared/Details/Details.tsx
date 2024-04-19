import { useDetailsContext, useSearchContext } from '@/providers'
import * as Icons from '@mdi/js'
import { Button, Detail, Medium } from '@/components'
import { DetailsControls } from '@/components/control-groups'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { formatDate, getRelativeTime } from '@/util/date'
import Icon from '@mdi/react'
import bem from '@/util/bem'
import { EDateFormat } from '@/types/app'
import { DetailsImageMeta, DetailsVideoMeta, DetailsDescription, DetailsAlbums, DetailsMap, DetailsSection, DetailsOwner, DetailsShares, useDetailsHotkeys, useRotate, useZoom } from '.'
import { useCallback, useEffect, useRef, useState } from 'react'

export const Details = () => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const { hits: media } = useSearchContext()

    const index = media.map(({ id }) => id).indexOf(details.medium?.id ?? '')
    const [showInfos, setShowInfos] = useState(true)
    const medium = details.medium ?? details.placeholder
    const [borderPosition, setBorderPosition] = useState<'horizontal' | 'vertical'>()

    const {
        updatedSource, rotation, loading
    } = useRotate()

    const previewRef = useRef<HTMLDivElement>(null)

    const {
        zoom, zoomRef, reset, zoomLevel, zoomCenter
    } = useZoom()

    const slide = (direction: number) => {
        if (media[index + direction] && details.active) {
            reset()
            details.open(media[index + direction])
        }
    }

    useDetailsHotkeys(slide)

    const classes = bem('details', [
        ['active', details.active],
        ['infos', showInfos]
    ])

    const resize = useCallback(() => {
        if (!medium) {
            return
        }

        const imageAspectRatio = medium.meta.width / medium.meta.height
        const containerAspectRatio = (previewRef.current?.clientWidth ?? 0) / (previewRef.current?.clientHeight ?? 1)

        if (imageAspectRatio > containerAspectRatio) {
            setBorderPosition('horizontal')
        }
        else {
            setBorderPosition('vertical')
        }
    }, [medium])

    useEffect(() => {
        window.addEventListener('resize', resize)

        return () => window.removeEventListener('resize', resize)
    })

    useEffect(() => {
        resize()
    }, [resize])

    if (!medium || !Object.keys(medium).length) {
        return null
    }

    const previewClasses = bem('details__preview', [
        ['video', medium.mimetype?.startsWith('video')],
        ['first', index === 0],
        ['last', index === media.length - 1]
    ])

    return <div
        className={classes}
        data-testid="details"
    >
        <div
            className={previewClasses}
            ref={previewRef}
        >
            <button
                onWheel={zoom}
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
                onWheel={zoom}
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
                        onClick={() => {
                            details.close()
                        }}
                        icon={Icons.mdiArrowLeft}
                    />
                </div>
                <div className="toolbar__section toolbar__section--right">
                    <DetailsControls />
                    {showInfos ? null : <Button
                        testId="show-infos"
                        hint={t(ETrans.SHOW_THING, {
                            thing: t(ETrans.INFO_PLURAL)
                        })}
                        appearance={{
                            text: 'light'
                        }}
                        onClick={() => setShowInfos(true)}
                        icon={Icons.mdiInformation}
                    />}
                </div>
            </div>
            <div
                className="details__container"
                onWheel={zoom}
                style={{
                    aspectRatio: `${medium.meta.width} / ${medium.meta.height}`,
                    width: borderPosition === 'horizontal' ? '100%' : undefined,
                    height: borderPosition === 'vertical' ? '100%' : undefined,
                    opacity: borderPosition ? 1 : 0
                }}
            >
                <div
                    className="details__zoom"
                    ref={zoomRef}
                    style={{
                        scale: `${zoomLevel + 1}`,
                        translate: `${zoomCenter[0]}px ${zoomCenter[1]}px`,
                        aspectRatio: `${medium.meta.width} / ${medium.meta.height}`
                    }}
                >
                    <div
                        className="details__rotate"
                        style={{
                            rotate: `${rotation}deg`,
                            scale: `${rotation % 180 ? medium.meta.height / medium.meta.width : 1}`,
                            opacity: loading ? 0 : 1
                        }}
                    >
                        <Medium
                            placeholder
                            priority
                            medium={medium}
                            width={medium.meta.width / 20}
                            updateHash={updatedSource}
                        />
                        <Medium
                            priority
                            testId="details-image"
                            medium={medium}
                            width={medium.meta.width / 2}
                            updateHash={updatedSource}
                        />
                    </div>
                </div>
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
                        onClick={() => setShowInfos(false)}
                        icon={Icons.mdiArrowRight}
                    />
                </div>
            </div>
            {details.medium ? <div className="details__sidebar-content">
                <DetailsDescription />
                <DetailsAlbums />
                <DetailsSection title={t(ETrans.DETAILS)}>
                    {details.medium.dateTaken ? <Detail
                        icon={Icons.mdiCalendar}
                        title={formatDate(details.medium.dateTaken, EDateFormat.LONG)}
                        values={getRelativeTime(details.medium.dateTaken)}
                    /> : null}
                    {details.medium.mimetype?.startsWith('image') ? <DetailsImageMeta /> : <DetailsVideoMeta />}
                </DetailsSection>
                <DetailsOwner />
                <DetailsShares />
                <DetailsMap />
            </div> : null}
        </aside>
    </div>
}
