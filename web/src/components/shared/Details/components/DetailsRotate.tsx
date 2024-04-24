'use client'

import { ReactNode } from 'react'
import { useRotationContext } from '@/providers/RotationProvider'
import { Medium } from '@/components/shared/Medium'
import { TQMedium } from '@photon/schema/dist/server'
import { useQMedium } from '@photon/schema/dist/client'
import bem from '@/util/bem'

type Props = {
    children: ReactNode
    medium: TQMedium['medium']
}

export const DetailsRotate = ({
    children, medium
}: Props) => {
    const {
        rotation, loading, updatedSource, sourceLoadedCallback, rotationRequest
    } = useRotationContext()

    const [refetchQuery] = useQMedium({
        variables: {
            id: medium.id
        }
    })

    const refetchedMedium = refetchQuery.data?.medium

    const classes = bem('details__rotate', [
        ['active', rotationRequest !== 0 || loading]
    ])

    return <div
        className={classes}
        data-testid="details-rotate"
        style={{
            rotate: `${rotation}deg`,
            scale: 1,
            opacity: loading ? 0 : 1,
            transition: loading ? 'unset' : undefined
        }}
    >

        {updatedSource ? <>
            <Medium
                placeholder
                priority
                medium={refetchedMedium ?? null}
                width={(refetchedMedium?.meta.width ?? 0) / 20}
                updateHash={updatedSource}
            />
            <Medium
                priority
                testId="details-image"
                medium={refetchedMedium ?? null}
                width={(refetchedMedium?.meta.width ?? 0) / 2}
                updateHash={updatedSource}
                onLoad={sourceLoadedCallback}
            />
        </> : children}
    </div>
}
