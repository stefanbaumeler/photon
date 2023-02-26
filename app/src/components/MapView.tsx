import { TMedium } from '@photon/schema'
import { useSearchContext, useSelectionContext } from '@/providers'
import Map, { Marker } from 'react-map-gl'
import { useEffect, useState } from 'react'
import * as Icons from '@mdi/js'
import Icon from '@mdi/react'
import { ETrans } from '@/types/translations'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@/components/IconButton'

export const MapView = () => {
    const { hits: media } = useSearchContext()
    const { t } = useTranslation()
    // const selection = useSelectionContext()

    const [markers, setMarkers] = useState<TMedium[]>([])
    const [mediaWithoutLocation, setMediaWithoutLocation] = useState<TMedium[]>([])

    useEffect(() => {
        const markers: TMedium[] = []
        const mediaWithoutLocation: TMedium[] = []

        media.forEach((medium) => {
            if (medium.location[0] && medium.location[1]) {
                markers.push(medium)
            }
            else {
                mediaWithoutLocation.push(medium)
            }
        })

        setMarkers(markers)
        setMediaWithoutLocation(mediaWithoutLocation)
    }, [media])

    const NoLocationButton = () => {
        if (mediaWithoutLocation.length === 0) {
            return <></>
        }

        return <IconButton
            hintPlacement="right"
            className="map__button"
            hint={t(ETrans.LOCATION_UNKNOWN)}
            icon={Icons.mdiMapMarkerQuestionOutline}
            badge={mediaWithoutLocation.length.toString()}
            badgePlacement={mediaWithoutLocation.length >= 10 ? 'below' : 'bottom-right'}
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
                key={k}
                latitude={marker.location[0]}
                longitude={marker.location[1]}
            />)}
        </Map>
        <NoLocationButton />
    </div>
}
