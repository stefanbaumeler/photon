import { TMedium } from '@photon/schema'
import { useDetailsContext, useSearchContext } from '@/providers'
import Map, { Marker } from 'react-map-gl'
import { useEffect, useState } from 'react'
import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@/components/IconButton'
import { Drawer } from '@/components/Drawer'
import { GalleryView } from '@/components'

export const MapView = () => {
    const { hits: media } = useSearchContext()
    const { t } = useTranslation()
    const details = useDetailsContext()
    // const selection = useSelectionContext()

    const [markers, setMarkers] = useState<TMedium[]>([])
    const [unknown, setUnknown] = useState<TMedium[]>([])
    const [unknownVisible, setUnknownVisible] = useState(false)

    useEffect(() => {
        const markers: TMedium[] = []
        const unknown: TMedium[] = []

        media.forEach((medium) => {
            if (medium.location[0] && medium.location[1]) {
                markers.push(medium)
            }
            else {
                unknown.push(medium)
            }
        })

        setMarkers(markers)
        setUnknown(unknown)
    }, [media])

    const NoLocationButton = () => {
        if (unknown.length === 0) {
            return <></>
        }

        return <IconButton
            hintPlacement="right"
            className="map__button"
            onClick={() => setUnknownVisible(!unknownVisible)}
            hint={t(ETrans.LOCATION_UNKNOWN)}
            icon={Icons.mdiMapMarkerQuestionOutline}
            badge={unknown.length.toString()}
            badgePlacement={unknown.length >= 10 ? 'below' : 'bottom-right'}
        />
    }

    return <div className="map">
        <Map
            reuseMaps={true}
            style={{
                width: '100%',
                height: '100%'
            }}
            initialViewState={{
                latitude: 0,
                longitude: 0
            }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        >
            {markers.map((marker, k) => <Marker
                onClick={() => details.open(marker)}
                key={k}
                latitude={marker.location[0]}
                longitude={marker.location[1]}
            />)}
        </Map>
        <Drawer active={unknownVisible}>
            <GalleryView
                media={unknown}
                targetRowHeight={120}
                containerWidth={621}
            />
        </Drawer>
        <NoLocationButton />
    </div>
}
