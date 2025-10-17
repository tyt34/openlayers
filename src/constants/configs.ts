import { API } from '../api/api'
import { DEFAULT_STYLE } from './styles'
import { OSM, TileWMS } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'

const CONFIG_VECTOR_SOURCE = {
  url: API.VECTOR,
  format: new GeoJSON(),
}

const vectorSource = new VectorSource(CONFIG_VECTOR_SOURCE)

export const CONFIG_BASE_LAYER = {
  source: new OSM(),
}

export const CONFIG_ZWS_LAYER = {
  source: new XYZ({
    url: API.ZULUGIS,
    crossOrigin: 'anonymous',
  }),
  opacity: 0.7,
}

export const CONFIG_VECTOR_LAYER = {
  source: vectorSource,
  style: DEFAULT_STYLE,
}

export const WMS_LAYER = {
  source: new TileWMS({
    url: API.TOPOGRAPHIC,
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
}
