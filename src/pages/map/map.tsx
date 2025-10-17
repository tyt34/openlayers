import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
} from '@mui/material'
import { Feature, View } from 'ol'
import { Header } from '../../component/header'
import { OSM } from 'ol/source'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
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

import './map.style.scss'

export const MapPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [countryData, setCountryData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

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
    // zwsLayer.setZIndex(0)
    // zwsLayer.set('interactive', false)

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

    // const handleMapClick = async (evt: any) => {
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
        setLoading(true)
        featureAtPixel.setStyle(highlightStyle)
        selectedFeatureLocal = featureAtPixel

        const props = featureAtPixel.getProperties()
        const countryName = props.name
        // setSelectedCountryName(countryName)

        try {
          const response = await axios.get(
            `https://restcountries.com/v3.1/name/${countryName}`,
            { params: { fullText: true }, timeout: 5000 },
          )

          console.log({ response })

          setCountryData(response.data[0])
        } catch (e) {
          console.error(e)
          setCountryData(null)
        } finally {
          setLoading(false)
        }
      } else {
        overlay.setPosition(undefined)
        selectedFeatureLocal = null
        setCountryData(null)
        setOpen(false)
      }
    }

    map.getViewport().addEventListener('click', (evt) => {
      const rect = map.getViewport().getBoundingClientRect()
      const pixel = [evt.clientX - rect.left, evt.clientY - rect.top] // координаты относительно канваса
      const feature = map.forEachFeatureAtPixel(pixel, (f) => f)
      handleMapClick(evt, feature) // передаем найденную feature
    })

    // map.getViewport().addEventListener('click', handleMapClick)

    // map.on('singleclick', handleMapClick)

    return () => {
      map.setTarget(undefined)
      // map.un('singleclick', handleMapClick)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    setCountryData(null)
  }

  return (
    <section className="map-page">
      <Header></Header>

      <div
        className="map-container"
        ref={mapRef}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {countryData?.name?.common ||
            countryData?.name ||
            'Неизвестная страна'}
        </DialogTitle>

        <DialogContent dividers>
          {loading ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 0',
              }}
            >
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Загружается информация...
              </Typography>
              <LinearProgress sx={{ width: '100%', borderRadius: 1 }} />
            </div>
          ) : countryData ? (
            <>
              <Typography>
                Столица: {countryData.capital?.[0] || '—'}
              </Typography>
              <Typography>
                Население:{' '}
                {countryData.population?.toLocaleString() || '—'}
              </Typography>
              <Typography>
                Валюта:{' '}
                {countryData.currencies
                  ? Object.keys(countryData.currencies).join(', ')
                  : '—'}
              </Typography>
              <Typography>
                Регион: {countryData.region || '—'}
              </Typography>
            </>
          ) : (
            <Typography>Нет данных</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </section>
  )
}
