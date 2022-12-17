import { TMedium } from '@/api'
import { Ref, useContext, useMemo, forwardRef } from 'react'
import Image from 'next/image'
import { DetailsContext } from '@/providers'
import bem from '@/util/bem'

type Props = {
    medium: TMedium
    width: number
    cy?: string
    priority?: boolean
    position?: string
}

const Medium = ({
    medium, width, cy, priority = false, position
}: Props, ref?: Ref<unknown>) => {
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
                unoptimized={true}
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

    const classes = bem('medium', [
        [position, !!position]
    ])

    return <div
        className={classes}
        ref={ref as Ref<HTMLDivElement>}
    >
        {ImageOrVideo}
    </div>
}

export default forwardRef(Medium)
