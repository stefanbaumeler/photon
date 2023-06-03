import { useDetailsContext, useDragContext, useSearchContext, useSelectionContext } from '@/providers'
import { Medium } from '..'
import { ESelectionMode } from '@/types/app'
import bem from '../../util/bem'
import { useTeaserContext } from './TeaserContext'
import { useRouter } from 'next/router'
import { TeaserContent } from './TeaserContent'
import { TeaserTopRightCorner } from './TeaserTopRightCorner'
import { TeaserBottomRightCorner } from './TeaserBottomRightCorner'
import { TeaserBottomLeftCorner } from './TeaserBottomLeftCorner'
import { TeaserTopLeftCorner } from '@/components/Teaser/TeaserTopLeftCorner'
import { isAlbum, isMedium } from '@/util/is'
import Link from 'next/link'
import { MouseEvent } from 'react'

const Teaser = () => {
    const router = useRouter()
    const details = useDetailsContext()
    const selection = useSelectionContext()
    const teaser = useTeaserContext()
    const { element } = teaser
    const drag = useDragContext()
    const { hits: media } = useSearchContext()

    const forceOpen = () => {
        if (isMedium(element)) {
            details.open(element)
        } else {
            router.push(`albums/${element.id}`)
        }
    }

    const open = (event: MouseEvent) => {
        event.preventDefault()

        if (selection.mode !== ESelectionMode.OFF) {
            selection.toggle(element)
            return
        }

        forceOpen()
    }

    const updateShiftTargets = (clear = false) => {
        if (selection.mode !== ESelectionMode.SELECT) {
            return
        }

        if (clear) {
            selection.setShiftTargets([])
            return
        }

        const ids = media.map((medium) => medium.id)
        const lastIndex = ids.indexOf(selection.lastAdded?.id)
        const hoverIndex = ids.indexOf(teaser.element.id)

        const newShiftTargets = lastIndex < hoverIndex ? media.slice(lastIndex, hoverIndex + 1) : media.slice(hoverIndex, lastIndex + 1)

        if (selection.shift) {
            selection.setShiftTargets(newShiftTargets)
        }
    }

    const classes = bem('teaser', [
        ['selected', selection.isSelected(element)],
        ['removed', selection.isSelected(element) && selection.mode === ESelectionMode.DELETE],
        ['removable', !selection.isSelected(element) && selection.mode === ESelectionMode.DELETE],
        ['last', selection.lastAdded?.id === element.id],
        ['shift', selection.shiftTargets.map((medium) => medium.id).includes(element.id) && selection.shift]
    ])

    let height
    let width

    if (teaser.width) {
        width = teaser.width
    }

    if (teaser.height) {
        height = teaser.height
    }

    if (!teaser.height && !teaser.width) {
        height = '100%'
    }

    const cover = isMedium(element) ? element : element.cover

    const onDragStart = () => {
        if (isMedium(element)) {
            drag.setDragging(element)
        }
    }

    const onDragEnd = () => {
        if (isMedium(element)) {
            drag.setDragging(undefined)
        }
    }

    return <div
        data-testid="teaser"
        className={classes}
        onMouseOver={() => updateShiftTargets(false)}
        onMouseOut={() => updateShiftTargets(true)}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
    >
        <TeaserTopLeftCorner />
        <TeaserTopRightCorner />
        <TeaserBottomRightCorner />
        <TeaserBottomLeftCorner />
        <Link
            href={isAlbum(element) ? `albums/${element.id}` : details.getUrl(element)}
            className="teaser__link"
            onClick={open}
        >
            <div className="teaser__container">
                <div
                    className="teaser__image-container"
                    style={{
                        width,
                        height
                    }}
                >
                    <Medium
                        testId="teaser-image"
                        medium={cover}
                        width={teaser.width ? teaser.width : teaser.height / cover?.meta.height * cover?.meta.width || 300}
                    />
                </div>
            </div>
            <TeaserContent />
        </Link>
    </div>
}

export default Teaser
