import { useEffect, useRef } from 'react'
import { Header } from '../../component/header'
import './map.style.scss'
import TileLayer from 'ol/layer/Tile'
import { OSM, TileWMS } from 'ol/source'
import { View } from 'ol'
import Map from 'ol/Map'
// import XYZ from 'ol/source/XYZ'
// import VectorSource from 'ol/source/Vector'
// import VectorLayer from 'ol/layer/Vector'
// import axios from 'axios'
// import GeoJSON from 'ol/format/GeoJSON'

export const MapPage = () => {
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
        url: 'https://ahocevar.com/geoserver/wms',
        params: {
          LAYERS: 'topp:states',
          TILED: true,
          VERSION: '1.1.1',
          FORMAT: 'image/png',
        },
        serverType: 'geoserver',
        crossOrigin: 'anonymous',
      }),
      opacity: 0.6, // немного прозрачности, чтобы видеть OSM под ним
    })

    // Vector слой для ZWS
    // const zwsVectorSource = new VectorSource()
    // const zwsLayer = new VectorLayer({
    //   source: zwsVectorSource,
    // })

    // ZWS слой через Tile
    // const zwsLayer = new TileLayer({
    //   source: new XYZ({
    //     url: 'http://zs.zulugis.ru:6473/getlayertile/a68b6214-0d80-4747-8616-014f7f5108a9/{z}/{x}/{y}', // пример URL ZWS
    //     crossOrigin: 'anonymous',
    //   }),
    //   opacity: 0.7,
    // })

    const map = new Map({
      target: mapRef.current,
      // layers: [
      //   new TileLayer({
      //     source: new OSM(), // базовая карта OpenStreetMap
      //   }),
      // ],
      //
      layers: [baseLayer, wmsLayer],
      // layers: [baseLayer, wmsLayer, zwsLayer],
      view: new View({
        center: [0, 0], // координаты в EPSG:3857
        zoom: 2,
      }),
    })

    // axios
    //   .post('http://zs.zulugis.ru:6473/ZuluWeb/GetLayerFeatures', {
    //     layerId: 'a68b6214-0d80-4747-8616-014f7f5108a9',
    //     // другие параметры ZWS
    //   })
    //   .then((res) => {
    //     const features = new GeoJSON().readFeatures(res.data)
    //     zwsVectorSource.addFeatures(features)
    //   })
    //   .catch(console.error)

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
