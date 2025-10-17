import { CONFIG_BASE_LAYER, WMS_LAYER } from '../../constants/configs'
import { Header } from '../../component/header'
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

    const baseLayer = new TileLayer(CONFIG_BASE_LAYER)

    const wmsLayer = new TileLayer(WMS_LAYER)

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
