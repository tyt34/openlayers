import { countryStore } from '../../store/storeCountry'
import { DialogCountry } from '../../component/dialog-country'
import { Feature, View } from 'ol'
import { Header } from '../../component/header'
import { observer } from 'mobx-react-lite'
import { OSM } from 'ol/source'
import { useEffect, useRef, useState } from 'react'
import Fill from 'ol/style/Fill'
import GeoJSON from 'ol/format/GeoJSON'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'

export const MapDetail = observer(() => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!mapRef.current) {
      return
    }

    const baseLayer = new TileLayer({
      source: new OSM(),
    })

    const zwsLayer = new TileLayer({
      source: new XYZ({
        url: 'http://zs.zulugis.ru:6473/ws?service=ZWMTS&request=GetTile&layer=world_3857&z={z}&x={x}&y={y}',
        crossOrigin: 'anonymous',
      }),
      opacity: 0.7,
    })

    const vectorSource = new VectorSource({
      url: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
      format: new GeoJSON(),
    })

    const defaultStyle = new Style({
      fill: new Fill({ color: 'rgba(0,0,255,0.1)' }),
      stroke: new Stroke({ color: '#3399CC', width: 1 }),
    })

    const highlightStyle = new Style({
      fill: new Fill({ color: 'rgba(0,255,0,0.3)' }),
      stroke: new Stroke({ color: '#00FF00', width: 2 }),
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: defaultStyle,
    })

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, zwsLayer, vectorLayer],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })

    const overlay = new Overlay({
      element: popupRef.current!,
      autoPan: true,
      offset: [0, -10],
    })

    map.addOverlay(overlay)

    let selectedFeatureLocal: Feature | null = null

    const handleMapClick = async (
      evt: MouseEvent,
      featureFromDOM?: any,
    ) => {
      console.log(' --> cl')

      const pixel = map.getEventPixel(evt)

      const featureAtPixel: Feature | null =
        featureFromDOM ||
        (map.forEachFeatureAtPixel(pixel, (f) => f) as Feature | null)

      if (selectedFeatureLocal) {
        selectedFeatureLocal.setStyle(defaultStyle)
      }

      if (featureAtPixel) {
        console.log({ featureAtPixel })
        setOpen(true)
        featureAtPixel.setStyle(highlightStyle)
        selectedFeatureLocal = featureAtPixel

        const props = featureAtPixel.getProperties()
        const countryName = props.name

        await countryStore.fetchCountry(countryName)
      } else {
        overlay.setPosition(undefined)
        selectedFeatureLocal = null
        // setCountryData(null)
        setOpen(false)
      }
    }

    /**
     * обход проблемы
     */
    map.getViewport().addEventListener('click', (evt) => {
      const rect = map.getViewport().getBoundingClientRect()
      const pixel = [evt.clientX - rect.left, evt.clientY - rect.top]
      const feature = map.forEachFeatureAtPixel(pixel, (f) => f)
      handleMapClick(evt, feature)
    })

    return () => {
      map.setTarget(undefined)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    countryStore.clearCountry()
  }

  return (
    <section className="map-page">
      <Header></Header>

      <div
        className="map-container"
        ref={mapRef}
      />

      <DialogCountry
        open={open}
        loading={countryStore.loading}
        countryData={countryStore.countryData}
        onClose={handleClose}
      />
    </section>
  )
})
