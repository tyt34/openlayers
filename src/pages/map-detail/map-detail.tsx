import {
  CONFIG_BASE_LAYER,
  CONFIG_VECTOR_LAYER,
  CONFIG_ZWS_LAYER,
} from '../../constants/configs'
import { countryStore } from '../../store/storeCountry'
import { DialogCountry } from '../../component/dialog-country'
import { Feature, MapBrowserEvent, View } from 'ol'
import { Header } from '../../component/header'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { DEFAULT_STYLE, HIGHLIGHT_STYLE } from '../../constants/styles'

export const MapDetail = observer(() => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!mapRef.current) {
      return
    }

    const baseLayer = new TileLayer(CONFIG_BASE_LAYER)

    const zwsLayer = new TileLayer(CONFIG_ZWS_LAYER)

    const vectorLayer = new VectorLayer(CONFIG_VECTOR_LAYER)

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
      evt: MapBrowserEvent<PointerEvent>,
      featureFromDOM?: Feature<any> | null,
    ) => {
      const pixel = evt.pixel

      const featureAtPixel: Feature | null =
        featureFromDOM ||
        (map.forEachFeatureAtPixel(pixel, (f) => f) as Feature | null)

      if (selectedFeatureLocal) {
        selectedFeatureLocal.setStyle(DEFAULT_STYLE)
      }

      if (featureAtPixel) {
        setOpen(true)
        featureAtPixel.setStyle(HIGHLIGHT_STYLE)
        selectedFeatureLocal = featureAtPixel

        const props = featureAtPixel.getProperties()
        const countryName = props.name

        await countryStore.fetchCountry(countryName)
      } else {
        overlay.setPosition(undefined)
        selectedFeatureLocal = null
        setOpen(false)
      }
    }

    map.on('click', async (evt) => {
      const featureAtPixel = map.forEachFeatureAtPixel(
        evt.pixel,
        (f) => f,
      ) as Feature<any> | null

      await handleMapClick(
        evt as MapBrowserEvent<PointerEvent>,
        featureAtPixel,
      )
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
