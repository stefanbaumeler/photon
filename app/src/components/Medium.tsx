import { TMedium } from '@photon/schema'
import { Ref, useMemo, forwardRef, useState } from 'react'
import Image from 'next/image'
import { useDetailsContext } from '@/providers'
import bem from '../util/bem'

type Props = {
    medium: TMedium
    width: number
    testId?: string
    priority?: boolean
    position?: string
    placeholder?: boolean
}

const Medium = ({
    medium, width, testId, priority = false, position, placeholder
}: Props, ref?: Ref<unknown>) => {
    const details = useDetailsContext()

    const [loaded, setLoaded] = useState(false)
    const ImageOrVideo = useMemo(() => {
        let el

        if (!width) {
            return <></>
        }

        if (medium.mimetype?.startsWith('image')) {
            el = <Image
                alt=""
                unoptimized={true}
                priority={priority}
                data-testid={testId}
                className="medium__image"
                fill={true}
                src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${medium.filenameDisk}?w=${Math.abs(parseInt(`${width * 2}`, 10))}`}
                onLoad={() => {
                    setLoaded(true)
                }}
            />
        } else if (medium.mimetype?.startsWith('video')) {
            el = <video
                controls={details.active}
                className="medium__video"
                src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${medium.filenameDisk}`}
            ></video>
        }
        else {
            el = <></>
        }

        return el
    }, [medium, width, loaded])

    const classes = bem('medium', [
        ['position', !!position],
        ['placeholder', !!placeholder],
        ['loading', !loaded]
    ])

    return <div
        className={classes}
        ref={ref as Ref<HTMLDivElement>}
    >
        {ImageOrVideo}
    </div>
}

export default forwardRef(Medium)
