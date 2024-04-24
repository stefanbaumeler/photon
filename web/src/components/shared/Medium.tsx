import { forwardRef, Ref } from 'react'
import Image from 'next/image'
import { TCover } from '@/types/app'
import bem from '@/util/bem'

type Props = {
    medium: TCover | null
    width?: number
    testId?: string
    priority?: boolean
    position?: string
    placeholder?: boolean
    updateHash?: number
    onLoad?: () => void
    forceAspectRatio?: boolean
}

const MediumEl = ({
    medium, width, testId, priority = false, position, placeholder, updateHash = 0, onLoad,
    forceAspectRatio
}: Props, ref?: Ref<unknown>) => {
    const classes = bem('medium', [
        [position, !!position],
        ['placeholder', !!placeholder],
        ['none', !medium]
    ])

    if (!medium) {
        return <div className={classes}>
            <div className="medium__image"></div>
        </div>
    }

    const naturalAspectRatio = medium.meta.width / medium.meta.height

    return <div
        className={classes}
        ref={ref as Ref<HTMLDivElement>}
        style={{
            aspectRatio: forceAspectRatio ? naturalAspectRatio : ''
        }}
    >
        {width && !!medium ? <>
            {medium.mimetype?.startsWith('image') ? <Image
                alt=""
                unoptimized
                priority={priority}
                data-testid={testId}
                className="medium__image"
                fill
                src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${medium.filenameDisk}?w=${Math.abs(parseInt(`${width * 2}`, 10))}&update=${updateHash}`}
                onLoad={onLoad}
            /> : null}
            {medium.mimetype?.startsWith('video') ? <video
                className="medium__video"
                src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${medium.filenameDisk}`}
            ></video> : null}
        </> : null}
    </div>
}

export const Medium = forwardRef(MediumEl)
