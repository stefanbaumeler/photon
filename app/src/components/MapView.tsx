import { TMedium } from '@photon/schema'
import { useSearchContext, useSelectionContext } from '@/providers'
import Map, { Marker } from 'react-map-gl'
import { useEffect, useState } from 'react'

export const MapView = () => {
    const { hits: media } = useSearchContext()
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

    console.log(markers)

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
    </div>
}
