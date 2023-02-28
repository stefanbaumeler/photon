import { Map, Marker } from 'react-map-gl'
import { useDetailsContext } from '@/providers'
import { useState } from 'react'

export const DetailsMap = () => {
    const details = useDetailsContext()

    const [mapState] = useState({
        latitude: details.medium.location[0],
        longitude: details.medium.location[1]
    })

    if (!details.medium.location[0] || !details.medium.location[1]) {
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
                latitude={details.medium.location[0]}
                longitude={details.medium.location[1]}
            />
        </Map>
    </div>
}
