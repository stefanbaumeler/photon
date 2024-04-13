import { forwardRef, Ref, useEffect, useState } from 'react'
import Image from 'next/image'
import { useDetailsContext, useLayoutContext } from '@/providers'
import bem from '../../util/bem'
import { ELayout, TCover } from '@/types/app'
import { useRouter } from 'next/router'

type Props = {
    medium: TCover | null
    width: number
    testId?: string
    priority?: boolean
    position?: string
    placeholder?: boolean
    updateHash?: number
}

const MediumEl = ({
    medium, width, testId, priority = false, position, placeholder, updateHash = 0
}: Props, ref?: Ref<unknown>) => {
    const details = useDetailsContext()
    const layout = useLayoutContext()
    const router = useRouter()

    const [loaded, setLoaded] = useState(false)

    const classes = bem('medium', [
        ['position', !!position],
        ['placeholder', !!placeholder],
        ['loading', !loaded && !!medium],
        ['none', !medium]
    ])

    useEffect(() => {
        setLoaded(false)
    }, [medium?.filenameDisk])

    if (!medium) {
        return <div className={classes}>
            <div className="medium__image"></div>
        </div>
    }

    const naturalAspectRatio = medium.meta.width / medium.meta.height

    return <div
        className={classes}
        style={{
            aspectRatio: router.pathname === '/albums' && layout.albumsLayout === ELayout.GRID ? 1.5 : naturalAspectRatio
        }}
        ref={ref as Ref<HTMLDivElement>}
    >
        {width && !!medium ? <>
            {medium.mimetype?.startsWith('image') ? <Image
                style={{
                    opacity: loaded ? 1 : 0
                }}
                alt=""
                unoptimized
                priority={priority}
                data-testid={testId}
                className="medium__image"
                fill
                src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${medium.filenameDisk}?w=${Math.abs(parseInt(`${width * 2}`, 10))}&update=${updateHash}`}
                onLoad={() => {
                    setLoaded(true)
                }}
            /> : null}
            {medium.mimetype?.startsWith('video') ? <video
                controls={details.active}
                className="medium__video"
                src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${medium.filenameDisk}`}
            ></video> : null}
        </> : null}
    </div>
}

export const Medium = forwardRef(MediumEl)
