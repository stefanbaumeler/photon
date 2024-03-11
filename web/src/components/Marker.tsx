import { Medium } from '@/components/Medium'
import { Marker as MarkerEl } from 'react-map-gl/dist/esm/exports-mapbox'

export default Marker = () => {
    return <MarkerEl
        key={key}
        latitude={markersOnScreen[key].marker.getLngLat().lat}
        longitude={markersOnScreen[key].marker.getLngLat().lng}
    >
        {markers.find((marker) => marker.id === key) ? <div
            key={key}
            className="map__marker"
            onClick={() => details.open(medium.id)}
        >
            <Medium
                medium={medium.cover}
                width={120}
            />
        </div> : <div
            className="map__cluster"
            key={key}
        >
            <div className="map__cluster-label">
                {markersOnScreen[key].feature.properties.point_count_abbreviated}
            </div>
        </div>}
    </MarkerEl>
}
