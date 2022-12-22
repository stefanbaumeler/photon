import { TMedium } from '@/api'
import { useContext, useState } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Icon from '@mdi/react'
import { Check, Medium } from '@/components'
import { ESelectionMode } from '@/types/app'
import useKeyboard from '@/hooks/keyboard'
import bem from '@/util/bem'
import { isEqual } from 'lodash'
import TeaserMeta from './TeaserMeta'
import { TeaserContext } from './TeaserContext'

const Teaser = () => {
    const details = useContext(DetailsContext)
    const selection = useContext(SelectionContext)
    const teaser = useContext(TeaserContext)

    const [shift, setShift] = useState(false)

    useKeyboard('keydown', 'Shift', () => {
        setShift(true)
    }, [])

    useKeyboard('keyup', 'Shift', () => {
        setShift(false)
    }, [])

    const select = () => {
        if (selection.mode === ESelectionMode.OFF) {
            selection.setMode(ESelectionMode.SELECT)
        }

        if (shift && selection.mode === ESelectionMode.SELECT) {
            selection.add(selection.shiftTargets)
            selection.setShiftTargets([])
        }
        else {
            selection.toggle(teaser.medium)
        }
    }

    const forceOpen = () => {
        details.open(teaser.medium)
    }

    const open = () => {
        if (selection.mode !== ESelectionMode.OFF) {
            select()
            return
        }

        forceOpen()
    }

    const updateShiftTargets = () => {
        if (selection.mode !== ESelectionMode.SELECT) {
            return
        }

        const ids = details.collection.map((medium) => medium.id)
        const lastIndex = ids.indexOf(selection.lastAdded?.id)
        const hoverIndex = ids.indexOf(teaser.medium.id)

        const newShiftTargets = lastIndex < hoverIndex ? details.collection.slice(lastIndex, hoverIndex + 1) : details.collection.slice(hoverIndex, lastIndex + 1)

        if (shift && !isEqual(selection.shiftTargets, newShiftTargets)) {
            selection.setShiftTargets(newShiftTargets)
        }
    }

    const classes = bem('teaser', [
        ['selected', selection.isSelected(teaser.medium)],
        ['removed', selection.isSelected(teaser.medium) && selection.mode === ESelectionMode.DELETE],
        ['removable', !selection.isSelected(teaser.medium) && selection.mode === ESelectionMode.DELETE],
        ['last', selection.lastAdded?.id === teaser.medium.id],
        ['shift', selection.shiftTargets.map((medium) => medium.id).includes(teaser.medium.id) && shift]
    ])

    const fallbackButtonClasses = bem('teaser__open-fallback', [
        ['delete', selection.mode === ESelectionMode.DELETE],
        ['single', selection.mode === ESelectionMode.SINGLE]
    ])

    return <div
        data-cy="teaser"
        className={classes}
        onMouseOver={updateShiftTargets}
    >
        <div
            className="teaser__check"
            data-cy="teaser-check"
        >
            <Check
                onClick={select}
                ready={selection.mode !== ESelectionMode.OFF}
                checked={selection.isSelected(teaser.medium)}
                remove={selection.mode === ESelectionMode.DELETE}
            />
        </div>
        <TeaserMeta />
        <button
            data-cy="teaser-details-fallback"
            className={fallbackButtonClasses}
            onClick={forceOpen}
        >
            <Icon
                path={Icons.mdiMagnifyPlusOutline}
                size={1}
            />
        </button>
        <div
            className="teaser__container"
            onClick={open}
        >
            <div
                className="teaser__image-container"
                style={{
                    width: teaser.width - 1,
                    height: teaser.height
                }}
            >
                <Medium
                    cy="teaser-image"
                    medium={teaser.medium}
                    width={teaser.width}
                />
            </div>
        </div>
    </div>
}

export default Teaser
