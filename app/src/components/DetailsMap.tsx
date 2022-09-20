import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'

type Props = {
    lat: number
    lng: number
}

const DetailsMap = ({
    lat, lng
}: Props) => {
    if (typeof lat === 'undefined' || typeof lng === 'undefined' || lat === null || lng === null) {
        return <></>
    }

    const foo = require('leaflet/dist/images/marker-icon-2x.png').default.src

    console.log(foo)

    const myIcon = L.icon({
        iconUrl: require('leaflet/dist/images/marker-icon-2x.png').default.src,
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    })

    return <div className="details-map">
        <a
            href={`https://google.com/maps/?q=loc:${lat},${lng}`}
            className="details-map__link"
            target="_blank"
            rel="noreferrer"
        >
            <MapContainer
                center={[lat, lng]}
                zoom={13}
                scrollWheelZoom={false}
                zoomControl={false}
                dragging={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={[lat, lng]}
                    icon={myIcon}
                />
            </MapContainer>
        </a>
    </div>
}

export default DetailsMap
