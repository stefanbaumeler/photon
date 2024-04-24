import { getUrqlClient } from '@/api'
import { QMediumDocument, TQMedium, TQMediumVariables } from '@photon/schema/dist/server'
import bem from '@/util/bem'
import { DetailsControls } from '@/components/control-groups/DetailsControls'
import { Medium } from '@/components/shared/Medium'
import { DetailsZoom } from '@/components/shared/Details/components/DetailsZoom'
import { DetailsRotate } from '@/components/shared/Details/components/DetailsRotate'
import { DetailsNav } from '@/components/shared/Details/components/DetailsNav'
import { EMediumStatus } from '@/types/app'
import { DetailsBackButton } from '@/components/shared/Details/components/DetailsBackButton'
import { Infobar } from '@/components/shared/Infobar'
import { Suspense } from 'react'

type Props = {
    id: string
    album?: string
    status?: EMediumStatus
    favorites?: boolean
}

export const Details = async ({
    id, album
}: Props) => {
    const client = getUrqlClient()

    const mediumQuery = await client.query<TQMedium, TQMediumVariables>(QMediumDocument, {
        id
    })

    const medium = mediumQuery.data?.medium

    const classes = bem('details', [
        ['active', true],
        ['infos', true]
    ])

    return <div
        className={classes}
        data-testid="details"
    >
        <div
            className="details__preview"
        >
            <div className="toolbar toolbar--light">
                <div className="toolbar__section toolbar__section--left">
                    <DetailsBackButton album={album} />
                </div>
                <div className="toolbar__section toolbar__section--right">
                    <DetailsControls />
                </div>
            </div>
            {medium ? <DetailsZoom medium={medium}>
                <DetailsNav
                    medium={medium?.id}
                />
                <DetailsRotate
                    medium={medium}
                >
                    <Medium
                        placeholder
                        priority
                        medium={medium ?? null}
                        width={(medium?.meta.width ?? 0) / 20}
                    />
                    <Medium
                        priority
                        testId="details-image"
                        medium={medium ?? null}
                        width={(medium?.meta.width ?? 0) / 2}
                    />
                </DetailsRotate>
            </DetailsZoom> : null}
        </div>
        {medium ? <Suspense>
            <Infobar medium={medium} />
        </Suspense> : null}
    </div>
}
