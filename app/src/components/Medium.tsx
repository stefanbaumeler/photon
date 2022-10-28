import { TMedium } from '@/types/api'
import { useContext, useEffect, useState } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Icon from '@mdi/react'
import { Check } from '@/components'
import { ESelectionMode } from '@/types/app'
import useKeyboard from '@/hooks/keyboard'
import bem from '@/util/bem'

type Props = {
    collection: TMedium[]
    medium: TMedium
    width: number
    height: number
}

const Medium = ({
    medium, width, height, collection
}: Props) => {
    const [loading, setLoading] = useState(true)
    const [maxWidth, setMaxWidth] = useState(50)
    const [shift, setShift] = useState(false)

    const details = useContext(DetailsContext)
    const selection = useContext(SelectionContext)

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

    useEffect(() => {
        if (width > maxWidth + 50) {
            setMaxWidth(width)
        }
    }, [width])

    const forceOpen = () => {
        details.open(medium, collection)
    }

    const open = () => {
        if (selection.mode !== ESelectionMode.OFF) {
            select()
            return
        }

        forceOpen()
    }

    const updateShiftTargets = () => {
        const ids = collection.map((medium) => medium.id)
        const lastIndex = ids.indexOf(selection.lastAdded?.id)
        const hoverIndex = ids.indexOf(medium.id)

        const newShiftTargets = lastIndex < hoverIndex ? collection.slice(lastIndex, hoverIndex + 1) : collection.slice(hoverIndex, lastIndex + 1)

        selection.setShiftTargets(newShiftTargets)
    }

    const classes = bem('medium', [
        ['selected', selection.isSelected(medium)],
        ['removed', selection.isSelected(medium) && selection.mode === ESelectionMode.DELETE],
        ['removable', !selection.isSelected(medium) && selection.mode === ESelectionMode.DELETE],
        ['last', selection.lastAdded?.id === medium.id],
        ['shift', selection.shiftTargets.map((medium) => medium.id).includes(medium.id) && shift]
    ])

    const imageClasses = bem('medium__image', [
        ['loaded', !loading]
    ])

    const fallbackButtonClasses = bem('medium__open-fallback', [
        ['delete', selection.mode === ESelectionMode.DELETE]
    ])

    return <div
        data-cy="medium"
        className={classes}
        onMouseOver={updateShiftTargets}
    >
        <div
            className="medium__check"
            data-cy="medium-check"
        >
            <Check
                onClick={select}
                ready={selection.mode !== ESelectionMode.OFF}
                checked={selection.isSelected(medium)}
                remove={selection.mode === ESelectionMode.DELETE}
            />
        </div>
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
            className="medium__container"
            onClick={open}
        >
            <div className="medium__image-container">
                <img
                    className="medium__placeholder"
                    width={width - 1}
                    height={height + 4}
                    src={`${process.env.NEXT_PUBLIC_UPLOADS_DIR}${medium.filenameDisk}?w=75`}
                    alt=""
                />
                <img
                    data-cy="medium-image"
                    className={imageClasses}
                    width={width - 1}
                    height={height + 4}
                    src={`${process.env.NEXT_PUBLIC_UPLOADS_DIR}${medium.filenameDisk}?w=${Math.abs(parseInt(`${maxWidth * 2}`, 10))}`}
                    alt=""
                    onLoad={() => setLoading(false)}
                />
            </div>
        </div>
    </div>
}

export default Medium
