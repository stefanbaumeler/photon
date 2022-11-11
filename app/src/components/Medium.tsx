import { TMedium } from '@/types/api'
import { useContext, useMemo } from 'react'
import Image from 'next/image'
import { DetailsContext } from '@/providers'

type Props = {
    medium: TMedium
    width: number
    cy: string
    priority?: boolean
}

export const Medium = ({
    medium, width, cy, priority = false
}: Props) => {
    const details = useContext(DetailsContext)
    const Video = useMemo(() => {
        return <video
            controls={details.active}
            className="medium__video"
            src={`${process.env.NEXT_PUBLIC_UPLOADS_DIR}${medium.filenameDisk}`}
        ></video>
    }, [medium, width])

    const ImageOrVideo = useMemo(() => {
        if (medium.mimetype?.startsWith('image')) {
            return <Image
                priority={priority}
                data-cy={cy}
                className="medium__image"
                layout={'fill'}
                src={`${process.env.NEXT_PUBLIC_UPLOADS_DIR}${medium.filenameDisk}?w=${Math.abs(parseInt(`${width * 2}`, 10))}`}
            />
        }

        if (medium.mimetype?.startsWith('video')) {
            return Video
        }

        return <></>
    }, [medium, width])

    return <div className="medium">
        {ImageOrVideo}
    </div>
}
