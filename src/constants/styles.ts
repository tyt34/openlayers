import Fill from 'ol/style/Fill'
import Style from 'ol/style/Style'
import { COLORS } from './colors'
import Stroke from 'ol/style/Stroke'

export const DEFAULT_STYLE = new Style({
  fill: new Fill({ color: COLORS.DARK_BLUE }),
  stroke: new Stroke({ color: COLORS.BLUE, width: 1 }),
})

export const HIGHLIGHT_STYLE = new Style({
  fill: new Fill({ color: COLORS.DARK_GREEN }),
  stroke: new Stroke({ color: COLORS.GREEN, width: 2 }),
})
