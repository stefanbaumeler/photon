import { TMedium } from '@/types/api'
import { useContext, useEffect, useState } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Icon from '@mdi/react'
import { Check } from '@/components'
import { ESelectionMode } from '@/types/app'
import useKeyboard from '@/hooks/keyboard'
import bem from '@/util/bem'
import { Medium } from '@/components/Medium'
import { isEqual } from 'lodash'
import { secondsToTime } from '@/util/date'
import { VideoMeta } from '@photon/api/src/types'

type Props = {
    medium: TMedium
    width: number
    height: number
}

const Teaser = ({
    medium, width, height
}: Props) => {
    const details = useContext(DetailsContext)
    const selection = useContext(SelectionContext)

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

        if (shift) {
            selection.add(selection.shiftTargets)
            selection.setShiftTargets([])
        }
        else {
            selection.toggle(medium)
        }
    }

    const forceOpen = () => {
        details.open(medium)
    }

    const open = () => {
        if (selection.mode !== ESelectionMode.OFF) {
            select()
            return
        }

        forceOpen()
    }

    const updateShiftTargets = () => {
        const ids = details.collection.map((medium) => medium.id)
        const lastIndex = ids.indexOf(selection.lastAdded?.id)
        const hoverIndex = ids.indexOf(medium.id)

        const newShiftTargets = lastIndex < hoverIndex ? details.collection.slice(lastIndex, hoverIndex + 1) : details.collection.slice(hoverIndex, lastIndex + 1)

        if (shift && !isEqual(selection.shiftTargets, newShiftTargets)) {
            selection.setShiftTargets(newShiftTargets)
        }
    }

    const classes = bem('teaser', [
        ['selected', selection.isSelected(medium)],
        ['removed', selection.isSelected(medium) && selection.mode === ESelectionMode.DELETE],
        ['removable', !selection.isSelected(medium) && selection.mode === ESelectionMode.DELETE],
        ['last', selection.lastAdded?.id === medium.id],
        ['shift', selection.shiftTargets.map((medium) => medium.id).includes(medium.id) && shift]
    ])

    const fallbackButtonClasses = bem('teaser__open-fallback', [
        ['delete', selection.mode === ESelectionMode.DELETE]
    ])

    const Meta = () => {
        if (medium.mimetype.startsWith('video')) {
            const meta = medium.meta as VideoMeta
            const seconds = secondsToTime(meta.duration)
            return <div className="teaser__meta">
                {seconds}
                <Icon
                    path={Icons.mdiPlayCircleOutline}
                    size={.75}
                />
            </div>
        }

        return <></>
    }

    return <div
        data-cy="medium"
        className={classes}
        onMouseOver={updateShiftTargets}
    >
        <div
            className="teaser__check"
            data-cy="medium-check"
        >
            <Check
                onClick={select}
                ready={selection.mode !== ESelectionMode.OFF}
                checked={selection.isSelected(medium)}
                remove={selection.mode === ESelectionMode.DELETE}
            />
        </div>
        <Meta />
        <button
            data-cy="medium-details-fallback"
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
                    width: width - 1,
                    height
                }}
            >
                <Medium
                    medium={medium}
                    width={width}
                />
            </div>
        </div>
    </div>
}

export default Teaser
