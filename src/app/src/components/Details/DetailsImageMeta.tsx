import { TImageMeta } from '@/api'
import { Detail } from '@/components'
import * as Icons from '@mdi/js'
import { useDetailsContext } from '@/providers'

export const DetailsImageMeta = () => {
    const details = useDetailsContext()

    const meta = details.medium.meta as TImageMeta

    if (!details.medium.mimetype?.startsWith('image')) {
        return <></>
    }

    return <>
        <Detail
            icon={Icons.mdiCameraIris}
            title={`${meta.cameraMake} ${meta.cameraModel}`}
            values={[`f/${meta.fNumber}`, `${meta.iso}`]}
        />
        <Detail
            icon={Icons.mdiMapMarker}
            title={`${meta.cameraMake} ${meta.cameraModel}`}
            values={[`f/${meta.fNumber}`, `${meta.iso}`]}
        />
    </>
}
