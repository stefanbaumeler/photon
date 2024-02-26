import { useDragContext, useSearchContext, useSelectionContext } from '@/providers'
import { Medium } from '@/components'
import { ESelectionMode } from '@/types/app'
import bem from '@/util/bem'
import { useTeaserContext } from './TeaserContext'
import { TeaserTopLeftCorner } from './TeaserTopLeftCorner'
import Link from 'next/link'
import { MouseEvent } from 'react'

const Teaser = () => {
    const selection = useSelectionContext()
    const teaser = useTeaserContext()
    const drag = useDragContext()
    const { hits: media } = useSearchContext()

    const open = (event: MouseEvent) => {
        if (!teaser.selectable) {
            teaser.onOpen()
            return
        }

        event.preventDefault()

        if (selection.mode !== ESelectionMode.OFF) {
            selection.toggle(teaser.id)
            return
        }

        teaser.onOpen()
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
        const lastIndex = ids.indexOf(selection.lastAdded)
        const hoverIndex = ids.indexOf(teaser.id)

        const newShiftTargets = (lastIndex < hoverIndex ? media.slice(lastIndex, hoverIndex + 1) : media.slice(hoverIndex, lastIndex + 1)).map((item) => item.id)

        if (selection.shift) {
            selection.setShiftTargets(newShiftTargets)
        }
    }

    const classes = bem('teaser', [
        ['selected', selection.isSelected(teaser.id)],
        ['removed', selection.isSelected(teaser.id) && selection.mode === ESelectionMode.DELETE],
        ['removable', !selection.isSelected(teaser.id) && selection.mode === ESelectionMode.DELETE],
        ['last', selection.lastAdded === teaser.id],
        ['shift', selection.shiftTargets.includes(teaser.id) && selection.shift]
    ])

    const onDragStart = () => {
        if (teaser.draggable) {
            drag.setDragging(teaser.id)
        }
    }

    const onDragEnd = () => {
        if (teaser.draggable) {
            drag.setDragging(undefined)
        }
    }

    return <div
        data-testid="teaser"
        className={classes}
        onMouseOver={teaser.selectable ? () => updateShiftTargets(false) : undefined}
        onMouseOut={teaser.selectable ? () => updateShiftTargets(true) : undefined}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
    >
        <TeaserTopLeftCorner />
        {teaser.topRightControls}
        {teaser.bottomLeftControls}
        {teaser.bottomRightControls}
        <Link
            href={teaser.href}
            className="teaser__link"
            onClick={open}
        >
            <div className="teaser__container">
                <div
                    className="teaser__image-container"
                    style={{
                        width: teaser.displayWidth,
                        height: teaser.displayHeight
                    }}
                >
                    <Medium
                        testId="teaser-image"
                        medium={teaser.cover}
                        width={teaser.displayWidth ? teaser.displayWidth : teaser.displayHeight / teaser.nativeHeight * teaser.nativeWidth || 300}
                    />
                </div>
            </div>
            {teaser.content}
        </Link>
    </div>
}

export default Teaser
