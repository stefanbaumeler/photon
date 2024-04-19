import { Map, Marker } from 'react-map-gl'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

export const DetailsMap = () => {
    const { medium } = useMediumFromRouter()

    const hasLocation = !!medium?.location && !!medium?.location[0] && !!medium?.location[1]
    const latitude = hasLocation ? medium?.location[0] : 0
    const longitude = hasLocation ? medium?.location[1] : 0

    const [mapState, setMapState] = useState({
        latitude,
        longitude
    })

    useEffect(() => {
        setMapState({
            latitude,
            longitude
        })
    }, [latitude, longitude, medium?.location])

    return hasLocation ? <div className="details__map">
        <Link
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
        >
            <Map
                reuseMaps
                interactive={false}
                {...mapState}
                style={{
                    width: '100%',
                    aspectRatio: 1
                }}
                initialViewState={{
                    zoom: 13
                }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
            >
                <Marker
                    latitude={mapState.latitude}
                    longitude={mapState.longitude}
                />
            </Map>
        </Link>
    </div> : null
}
