import { ESelectionMode } from '@/types/app'
import bem from '@/util/bem'
import Link from 'next/link'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useTeaserContext } from '@/components/shared/Teaser/components/TeaserContext'
import { useDragContext } from '@/providers/DragProvider'
import { useSearchContext } from '@/providers/SearchProvider'
import { TeaserTopLeftCorner } from '@/components/shared/Teaser/components/TeaserTopLeftCorner'
import { Medium } from '@/components/shared/Medium'

export const VisualTeaser = () => {
    const selection = useSelectionContext()
    const teaser = useTeaserContext()
    const drag = useDragContext()
    const { hits: media } = useSearchContext()
    const [updatedSource, setUpdatedSource] = useState(0)

    const src = useRef(updatedSource)

    // useEffect(() => {
    //     if (teaser.id === details.medium?.id) {
    //         setUpdatedSource(src.current + 1)
    //     }
    // }, [teaser.id, details.medium?.id, src, details.rotationRequest])

    const open = (event: MouseEvent) => {
        if (selection.mode !== ESelectionMode.OFF) {
            selection.toggle(teaser.id)
            event.preventDefault()
        }
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
        const lastIndex = ids.indexOf(selection.lastAdded ?? '')
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

    const getWidth = () => {
        if (teaser.displayWidth) {
            return teaser.displayWidth
        }

        if (teaser.displayHeight) {
            return teaser.displayHeight * teaser.nativeWidth
        }

        return 300
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
                        medium={teaser.cover ?? null}
                        width={getWidth()}
                        updateHash={updatedSource}
                    />
                </div>
            </div>
            {teaser.content}
        </Link>
    </div>
}
