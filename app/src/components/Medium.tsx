import { TMedium } from '@/types/api'
import { useContext, useEffect, useState } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Icon from '@mdi/react'
import { Check } from '@/components'
import { ESelectionMode } from '@/types/app'

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

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            if (event.key === 'Shift') {
                setShift(true)
            }
        }

        const keyup = (event: KeyboardEvent) => {
            if (event.key === 'Shift') {
                setShift(false)
            }
        }

        window.addEventListener('keydown', keydown)
        window.addEventListener('keyup', keyup)

        return () => {
            window.removeEventListener('keydown', keydown)
            window.removeEventListener('keyup', keyup)
        }
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

    const FallbackButton = () => {
        if (selection.mode === ESelectionMode.DELETE) {
            return <></>
        }

        return <button
            className="medium__open-fallback"
            onClick={forceOpen}
        >
            <Icon
                path={Icons.mdiMagnifyPlusOutline}
                size={1}
            />
        </button>
    }

    const updateShiftTargets = () => {
        const ids = collection.map((medium) => medium.id)
        const lastIndex = ids.indexOf(selection.lastAdded?.id)
        const hoverIndex = ids.indexOf(medium.id)

        const newShiftTargets = lastIndex < hoverIndex ? collection.slice(lastIndex, hoverIndex + 1) : collection.slice(hoverIndex, lastIndex + 1)

        selection.setShiftTargets(newShiftTargets)
    }

    const classes = ['medium']

    if (selection.isSelected(medium)) {
        classes.push('medium--selected')

        if (selection.mode === ESelectionMode.DELETE) {
            classes.push('medium--removed')
        }
    } else if (selection.mode === ESelectionMode.DELETE) {
        classes.push('medium--removable')
    }

    if (selection.lastAdded?.id === medium.id) {
        classes.push('medium--last')
    }

    if (selection.shiftTargets.map((medium) => medium.id).includes(medium.id) && shift) {
        classes.push('medium--shift')
    }

    return <div
        className={classes.join(' ')}
        onMouseOver={updateShiftTargets}
    >
        <div className="medium__check">
            <Check
                onClick={select}
                ready={selection.mode !== ESelectionMode.OFF}
                checked={selection.isSelected(medium)}
                remove={selection.mode === ESelectionMode.DELETE}
            />
        </div>
        <FallbackButton />
        <div
            className="medium__container"
            onClick={open}
        >
            <div className="medium__image-container">
                <img
                    className="medium__placeholder"
                    width={width - 1}
                    height={height + 4}
                    src={`http://localhost:2000/uploads/${medium.filenameDisk}?w=75`}
                    alt=""
                />
                <img
                    className={`medium__image${!loading ? ' medium__image--loaded' : ''}`}
                    width={width - 1}
                    height={height + 4}
                    src={`http://localhost:2000/uploads/${medium.filenameDisk}?w=${Math.abs(parseInt(`${maxWidth * 2}`, 10))}`}
                    alt=""
                    onLoad={() => setLoading(false)}
                />
            </div>
        </div>
    </div>
}

export default Medium
