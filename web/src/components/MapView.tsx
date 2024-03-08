import { useEffect, useRef, useState } from 'react'
import { AttributionControl,
    GeoJSONSource, Layer,
    LayerProps,
    Map,
    MapboxGeoJSONFeature,
    MapLayerMouseEvent,
    Marker as MarkerEl,
    MapRef, Source } from 'react-map-gl'
import { useDetailsContext, useSearchContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import { Marker } from 'mapbox-gl'
import { ETrans } from '@/types/translations'
import * as Icons from '@mdi/js'
import { Drawer, FilmStrip, Medium, Button, TCover } from '@/components'

type TMapItem = {
    id: string
    cover: TCover | null
    width: number
    location?: number[]
    favoredBy: number
}

export const MapView = () => {
    const mapRef = useRef<MapRef>(null)

    const { hits: media } = useSearchContext()
    const { t } = useTranslation()
    const details = useDetailsContext()
    // const selection = useSelectionContext()

    const [markersOnScreen, setMarkersOnScreen] = useState<{[key: string]: {
            marker: Marker
            feature: MapboxGeoJSONFeature
        }}>({})
    const [markers, setMarkers] = useState<TMapItem[]>([])
    const [mediaInBounds, setMediaInBounds] = useState<TMapItem[]>([])
    const [unknown, setUnknown] = useState<TMapItem[]>([])
    const [unknownVisible, setUnknownVisible] = useState(false)

    useEffect(() => {
        const markers: TMapItem[] = []
        const unknowns: TMapItem[] = []

        media.forEach((medium) => {
            const marker = {
                id: medium.id,
                cover: medium,
                width: medium.meta.width,
                favoredBy: medium.favoredBy.length
            }

            if (medium.location[0] && medium.location[1]) {
                markers.push({
                    ...marker,
                    location: medium.location
                })
            }
            else {
                unknowns.push(marker)
            }
        })

        setMarkers(markers)
        setUnknown(unknowns)
    }, [media])

    const NoLocationButton = () => {
        if (unknown.length === 0) {
            return <></>
        }

        return <Button
            hint={{
                label: t(ETrans.LOCATION_UNKNOWN),
                placement: 'right'
            }}
            className="map__button"
            onClick={() => setUnknownVisible(!unknownVisible)}
            icon={Icons.mdiMapMarkerQuestionOutline}
            badge={{
                label: unknown.length.toString(),
                placement: unknown.length >= 10 ? 'below' : 'bottom-right'
            }}
        />
    }

    const layers = [
        {
            id: 'clusters',
            type: 'circle',
            source: 'mediaMarkers',
            filter: ['has', 'point_count'],
            paint: {
                'circle-opacity': 0,
                'circle-radius': 25
            }
        }
    ] as LayerProps[]

    const onMapClick = (event: MapLayerMouseEvent) => {
        const feature = event.features[0]

        if (!feature) {
            return
        }

        const clusterId = feature.properties.cluster_id

        const mapboxSource = mapRef.current.getSource('mediaMarkers') as GeoJSONSource

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
                return
            }

            if (feature.geometry.type === 'Point') {
                mapRef.current.easeTo({
                    center: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
                    zoom,
                    duration: 500
                })
            }
        })
    }

    const onMapRender = () => {
        const newMarkers: {[key: string]: {
                marker: Marker
                feature: MapboxGeoJSONFeature
            }} = {}
        const features = mapRef.current?.querySourceFeatures('mediaMarkers') || []

        features.forEach((feature) => {
            if (feature.geometry.type !== 'Point' || feature.properties.cluster_id) {
                return
            }

            const coords = feature.geometry.coordinates as [number, number]
            const id = feature.properties.cluster_id || feature.properties.id

            if (!newMarkers[id]) {
                newMarkers[id] = {
                    marker: new Marker().setLngLat(coords),
                    feature
                }
            }
        })

        features.forEach((feature) => {
            if (feature.geometry.type !== 'Point' || !feature.properties.cluster_id) {
                return
            }

            const coords = feature.geometry.coordinates as [number, number]
            const id = feature.properties.cluster_id || feature.properties.id

            if (!newMarkers[id]) {
                newMarkers[id] = {
                    marker: new Marker().setLngLat(coords),
                    feature
                }
            }
        })

        for (const id in markersOnScreen) {
            if (!newMarkers[id]) {
                markersOnScreen[id].marker.remove()
            }
        }

        const currentKeys = Object.keys(markersOnScreen)
        const newKeys = Object.keys(newMarkers)

        if (currentKeys.length !== newKeys.length) {
            setMarkersOnScreen(newMarkers)
            return
        }

        for (let i = 0; i < currentKeys.length; i++) {
            if (currentKeys[i] !== newKeys[i]) {
                setMarkersOnScreen(newMarkers)
                break
            }
        }
    }

    const bounds = mapRef.current?.getBounds().toArray()

    const recalculateMediaInBounds = () => {
        if (bounds) {
            const isOnMap = (
                bounds: number[][],
                point: number[]
            ) => {
                const sw = bounds[0]
                const ne = bounds[1]

                if (sw && ne) {
                    const isLngInRange = point[1] >= sw[0] && point[1] <= ne[0]
                    const isLatInRange = point[0] >= sw[1] && point[0] <= ne[1]
                    return isLngInRange && isLatInRange
                }

                return true
            }

            const newMediaInBounds = media.filter((medium) => {
                return isOnMap(bounds, medium.location)
            }).map((medium) => {
                return {
                    id: medium.id,
                    cover: medium,
                    width: medium.meta.width,
                    location: medium.location,
                    favoredBy: medium.favoredBy.length
                }
            })

            setMediaInBounds(newMediaInBounds)
        }
    }

    useEffect(() => {
        recalculateMediaInBounds()
    }, [recalculateMediaInBounds])

    const HTMLMarker = ({ k }: { k: string }) => {
        const medium = markers.find((marker) => marker.id === k)

        if (medium) {
            return <div
                className="map__marker"
                onClick={() => details.open(medium.id)}
            >
                <Medium
                    medium={medium.cover}
                    width={120}
                />
            </div>
        }

        return <div className="map__cluster">
            <div className="map__cluster-label">
                {markersOnScreen[k].feature.properties.point_count_abbreviated}
            </div>
        </div>
    }

    return <div className="map">
        <div className="map__map">
            <Map
                style={{
                    width: '100%',
                    height: '100%'
                }}
                initialViewState={{
                    latitude: 0,
                    longitude: 0
                }}
                interactiveLayerIds={['clusters']}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                onClick={onMapClick}
                ref={mapRef}
                onRender={onMapRender}
                onMoveEnd={recalculateMediaInBounds}
                attributionControl={false}
                logoPosition={'top-left'}
            >
                <AttributionControl
                    position={'top-left'}
                />
                <Source
                    id="mediaMarkers"
                    type="geojson"
                    cluster={true}
                    clusterRadius={50}
                    data={{
                        type: 'FeatureCollection',
                        features: markers.map((marker) => {
                            return {
                                geometry: {
                                    type: 'Point',
                                    coordinates: [marker.location[1], marker.location[0]]
                                },
                                properties: marker,
                                type: 'Feature'
                            }
                        })
                    }}
                >
                    {layers.map((layer, k) => <Layer
                        key={k}
                        {...layer}
                    />)}
                </Source>
                {Object.keys(markersOnScreen).map((key) => <MarkerEl
                    key={key}
                    latitude={markersOnScreen[key].marker.getLngLat().lat}
                    longitude={markersOnScreen[key].marker.getLngLat().lng}
                >
                    <HTMLMarker k={key} />
                </MarkerEl>)}
            </Map>
        </div>
        <Drawer
            active={unknownVisible}
            side={'bottom'}
        >
            <FilmStrip
                media={unknown}
            />
        </Drawer>
        <Drawer
            active={!unknownVisible}
            side={'bottom'}
        >
            <FilmStrip
                media={mediaInBounds}
            />
        </Drawer>
        <NoLocationButton />
    </div>
}
