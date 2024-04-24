'use client'

import { TImageMeta } from '@photon/schema/dist/client'
import * as Icons from '@mdi/js'
import { Detail } from '@/components/shared/Detail'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

export const InfobarImageMeta = () => {
    const { medium } = useMediumFromRouter()

    if (!medium) {
        return null
    }

    const meta = medium.meta as TImageMeta
    const subtitle = [medium.address,  medium.place].filter((val) => !!val)

    const f = meta.fNumber ? `f/${meta.fNumber}` : undefined
    const iso = meta.iso ? `ISO${meta.iso}` : undefined

    return <>
        <Detail
            icon={Icons.mdiCameraIris}
            title={`${meta.cameraMake} ${meta.cameraModel}`}
            values={[f, meta.focalLength ?? '', iso]}
            testId="camera-detail"
        />
        <Detail
            icon={Icons.mdiImageOutline}
            title={`${medium.filenameDownload}`}
            values={[`${(meta.width * meta.height / 1000000).toFixed(1)}MP`, `${meta.width}×${meta.height}`]}
            testId="image-detail"
        />
        {!medium.region && !medium.country ? null : <Detail
            icon={Icons.mdiMapMarkerOutline}
            title={`${medium.region}, ${medium.country}`}
            values={subtitle.length ? subtitle : undefined}
            testId="location-detail"
        />}
    </>
}
