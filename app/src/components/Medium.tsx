import { TMedia } from '@/types/api'
import { useContext, useEffect, useState } from 'react'
import { DetailsContext } from '@/contexts'

type Props = {
    medium: TMedia
    width: number
    height: number
}

const Medium = ({
    medium, width, height
}: Props) => {
    const [loading, setLoading] = useState(true)
    const [maxWidth, setMaxWidth] = useState(50)
    const { openDetails } = useContext(DetailsContext)

    const open = () => {
        openDetails(medium)
    }

    useEffect(() => {
        if (width > maxWidth + 50) {
            setMaxWidth(width)
        }
    }, [width])

    return <div
        className="medium"
        onClick={open}
    >
        <div className="medium__check"></div>
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
}

export default Medium
