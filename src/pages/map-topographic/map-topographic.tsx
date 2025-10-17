import { Header } from '../../component/header'
import { OSM, TileWMS } from 'ol/source'
import { useEffect, useRef } from 'react'
import { View } from 'ol'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'

export const MapTopographic = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      return
    }

    const baseLayer = new TileLayer({
      source: new OSM(),
    })

    const wmsLayer = new TileLayer({
      source: new TileWMS({
        url: 'https://demo.mapserver.org/cgi-bin/wms?',
        params: {
          LAYERS: 'bluemarble',
          TILED: true,
          VERSION: '1.1.1',
          FORMAT: 'image/png',
        },
        serverType: 'geoserver',
        crossOrigin: 'anonymous',
      }),
      opacity: 0.6,
    })

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, wmsLayer],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })

    return () => map.setTarget(undefined)
  }, [])

  return (
    <section className="map-page">
      <Header></Header>

      <div
        className="map-container"
        ref={mapRef}
      />
    </section>
  )
}
