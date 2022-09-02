import { TMedia } from '@/types/api'
import { useContext, useEffect, useState } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'
import { mdiCheck } from '@mdi/js'
import Icon from '@mdi/react'

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
    const [selected, setSelected] = useState(false)

    const [maxWidth, setMaxWidth] = useState(50)
    const { openDetails } = useContext(DetailsContext)
    const {
        addSelected, removeSelected, isSelected, selected: foo
    } = useContext(SelectionContext)

    const open = () => {
        openDetails(medium, collection)
    }

    useEffect(() => {
        if (width > maxWidth + 50) {
            setMaxWidth(width)
        }
    }, [width])

    const select = () => {
        if (isSelected(medium)) {
            removeSelected(medium)
            setSelected(false)
        }
        else {
            addSelected(medium)
            setSelected(true)
        }

        console.log(foo)
    }

    return <div className={`medium${selected ? ' medium--selected' : ''}`}>
        <button
            className="medium__check"
            onClick={select}
        >
            <Icon
                path={mdiCheck}
                size={.9}
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
