import { Map, Marker } from 'react-map-gl'
import { useDetailsContext } from 'web/src/providers'
import { useEffect, useState } from 'react'

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
    }, [details.medium.location])

    if (!hasLocation) {
        return <></>
    }

    return <div className="details__map">
        <Map
            {...mapState}
            style={{
                width: '100%',
                aspectRatio: 1
            }}
            initialViewState={{
                zoom: 13
            }}
            dragPan={false}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        >
            <Marker
                latitude={mapState.latitude}
                longitude={mapState.longitude}
            />
        </Map>
    </div>
}
