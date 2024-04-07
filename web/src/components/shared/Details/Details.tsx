import { useDetailsContext, useSearchContext } from '@/providers'
import * as Icons from '@mdi/js'
import { Button, Detail, Medium } from '@/components'
import { DetailsControls } from '@/components/control-groups'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { formatDate, getRelativeTime } from '@/util/date'
import Icon from '@mdi/react'
import bem from '@/util/bem'
import { EDateFormat, EKeyboardScope } from '@/types/app'
import { DetailsImageMeta, DetailsVideoMeta, DetailsDescription, DetailsAlbums, DetailsMap, DetailsSection, DetailsOwner, DetailsShares } from '.'
import { useEffect, useState } from 'react'
import { useHotkeysContext } from 'react-hotkeys-hook'
import { useHotkey } from '@/hooks/hotkey'
import { useRotate } from '@/hooks'

export const Details = () => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const { hits: media } = useSearchContext()
    const index = media.map(({ id }) => id).indexOf(details.medium?.id)
    const [showInfos, setShowInfos] = useState(true)
    const medium = details.medium ?? details.placeholder
    const [loading, setLoading] = useState(false)
    const [rotation, setRotation] = useState(0)
    const rotate = useRotate(details.medium?.id)
    const [updatedSource, setUpdatedSource] = useState(0)

    const {
        enableScope, disableScope
    } = useHotkeysContext()

    const slide = (direction: number) => {
        if (media[index + direction] && details.active) {
            details.open(media[index + direction])
        }
    }

    useEffect(() => {
        if (details.active) {
            enableScope(EKeyboardScope.details)
        }
    }, [details.active, enableScope])

    useEffect(() => {
        setRotation(details.rotationRequest)
        const timer = setTimeout(() => {
            if (rotation !== 0) {
                rotate(details.rotationRequest).then(() => {
                    details.resolveRotationRequest()
                    setUpdatedSource(updatedSource + 1)
                    setLoading(true)
                })
            }
        }, 250)
        return () => {
            clearTimeout(timer)
        }
    }, [updatedSource, rotation, details, rotate])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [loading])

    useHotkey('Escape', () => {
        disableScope(EKeyboardScope.details)
        details.close()
    }, EKeyboardScope.details)

    useHotkey('ArrowLeft', () => {
        slide(-1)
    }, EKeyboardScope.details)

    useHotkey('ArrowRight', () => {
        slide(1)
    }, EKeyboardScope.details)

    const classes = bem('details', [
        ['active', details.active],
        ['infos', showInfos]
    ])

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
                style={{
                    aspectRatio: `${medium.meta.width} / ${medium.meta.height}`
                }}
            >
                <div style={{
                    rotate: `${rotation}deg`,
                    scale: `${rotation % 180 ? medium.meta.height / medium.meta.width : 1}`,
                    opacity: loading ? 0 : 1,
                    transition: 'scale .25s, rotate .25s'
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
