import { TImageMeta } from '@photon/schema'
import { Detail } from '../'
import * as Icons from '@mdi/js'
import { useDetailsContext } from '@/providers'

export const DetailsImageMeta = () => {
    const details = useDetailsContext()

    const meta = details.medium.meta as TImageMeta

    if (!details.medium.mimetype?.startsWith('image')) {
        return <></>
    }

    const LocationMeta = () => {
        if (!details.medium.region && !details.medium.country) {
            return <></>
        }

        const subtitle = [details.medium.address,  details.medium.place].filter((val) => !!val)

        return <Detail
            icon={Icons.mdiMapMarkerOutline}
            title={`${details.medium.region}, ${details.medium.country}`}
            values={subtitle.length ? subtitle : undefined}
        />
    }

    const f = meta.fNumber ? `f/${meta.fNumber}` : undefined
    const iso = meta.iso ? `ISO${meta.iso}` : undefined

    return <>
        <Detail
            icon={Icons.mdiCameraIris}
            title={`${meta.cameraMake} ${meta.cameraModel}`}
            values={[f, meta.focalLength, iso]}
        />
        <Detail
            icon={Icons.mdiImageOutline}
            title={`${details.medium.filenameDownload}`}
            values={[`${(meta.width * meta.height / 1000000).toFixed(1)}MP`, `${meta.width}×${meta.height}`]}
        />
        <LocationMeta />
    </>
}
