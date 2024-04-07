import { Map, Marker } from 'react-map-gl'
import { useDetailsContext } from '@/providers'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export const DetailsMap = () => {
    const details = useDetailsContext()
    const hasLocation = !!details.medium.location && !!details.medium.location[0] && !!details.medium.location[1]
    const latitude = hasLocation ? details.medium.location[0] : 0
    const longitude = hasLocation ? details.medium.location[1] : 0

    const [mapState, setMapState] = useState({
        latitude,
        longitude
    })

    useEffect(() => {
        setMapState({
            latitude,
            longitude
        })
    }, [latitude, longitude, details.medium.location])

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
