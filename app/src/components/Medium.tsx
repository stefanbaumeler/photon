import { TMedia } from '@/types/api'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Icon from '@mdi/react'
import { Check } from '@/components/index'

type Props = {
    collection: TMedia[]
    medium: TMedia
    width: number
    height: number
}

const Medium = ({
    medium, width, height, collection
}: Props) => {
    const [loading, setLoading] = useState(true)
    const [maxWidth, setMaxWidth] = useState(50)
    const { openDetails } = useContext(DetailsContext)

    const {
        addSelected, removeSelected, isSelected, isInSelectionMode
    } = useContext(SelectionContext)

    const select = () => {
        if (isSelected(medium)) {
            removeSelected(medium)
        }
        else {
            addSelected(medium)
        }
    }

    useEffect(() => {
        if (width > maxWidth + 50) {
            setMaxWidth(width)
        }
    }, [width])

    const forceOpen = () => {
        openDetails(medium, collection)
    }

    const open = () => {
        if (isInSelectionMode) {
            select()
        }
        else {
            openDetails(medium, collection)
        }
    }

    return <div className={`medium${isSelected(medium) ? ' medium--selected' : ''}`}>
        <div className="medium__check">
            <Check
                onClick={select}
                ready={isInSelectionMode}
                checked={isSelected(medium)}
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
                    src={`http://localhost:2000/uploads/${medium.filename_disk}?w=75`}
                    alt=""
                />
                <img
                    className={`medium__image${!loading ? ' medium__image--loaded' : ''}`}
                    width={width}
                    height={height + 4}
                    src={`http://localhost:2000/uploads/${medium.filename_disk}?w=${Math.abs(parseInt(`${maxWidth * 2}`, 10))}`}
                    alt=""
                    onLoad={() => setLoading(false)}
                />
            </div>
        </div>
    </div>
}

export default Medium
