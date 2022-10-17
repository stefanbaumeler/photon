import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { useState } from 'react'

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

    const [markerIcon, setMarkerIcon] = useState('')

    import('leaflet/dist/images/marker-icon-2x.png').then((icon) => {
        setMarkerIcon(icon.default.src)
    })

    const ConditionalMarker = () => {
        if (markerIcon) {
            const icon = L.icon({
                iconUrl: markerIcon,
                iconSize: [25, 41],
                iconAnchor: [12.5, 41],
                popupAnchor: null,
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null
            })

            return <Marker
                position={[lat, lng]}
                icon={icon}
            />
        }

        return <></>
    }

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
                <ConditionalMarker />
            </MapContainer>
        </a>
    </div>
}

export default DetailsMap
