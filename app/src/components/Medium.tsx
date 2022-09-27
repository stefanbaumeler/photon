import { TMedium } from '@/types/api'
import { useContext, useEffect, useState } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Icon from '@mdi/react'
import { Check } from '@/components/index'

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
    const details = useContext(DetailsContext)

    const selection = useContext(SelectionContext)

    const select = () => {
        selection.toggle(medium)
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
        if (selection.isInSelectionMode) {
            select()
        }
        else {
            details.open(medium, collection)
        }
    }

    return <div className={`medium${selection.isSelected(medium) ? ' medium--selected' : ''}`}>
        <div className="medium__check">
            <Check
                onClick={select}
                ready={selection.isInSelectionMode}
                checked={selection.isSelected(medium)}
            />
        </div>
        <button
            className="medium__open-fallback"
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
                    width={width}
                    height={height + 4}
                    src={`http://localhost:2000/uploads/${medium.filenameDisk}?w=75`}
                    alt=""
                />
                <img
                    className={`medium__image${!loading ? ' medium__image--loaded' : ''}`}
                    width={width}
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
