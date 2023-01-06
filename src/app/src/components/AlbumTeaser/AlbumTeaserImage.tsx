import { useMemo } from 'react'
import { useQMedium } from '@/api'

type Props = {
    id: string
}

const AlbumTeaserImage = ({ id }: Props) => {
    const thumbnailQuery = useQMedium({
        variables: {
            id: `${id}`
        }
    })

    const thumbnail = thumbnailQuery.data?.medium

    return useMemo(() => {
        if (thumbnailQuery.loading || !thumbnail.filenameDisk) {
            return <></>
        }

        return <img
            data-testid={'album-image'}
            className="album__image"
            src={`${process.env.NEXT_PUBLIC_UPLOADS_DIR}${thumbnail.filenameDisk}?w=800`}
            alt=""
        />
    }, [thumbnail])
}

export default AlbumTeaserImage
