export const API = {
  ZULUGIS:
    'http://zs.zulugis.ru:6473/ws?service=ZWMTS&request=GetTile&layer=world_3857&z={z}&x={x}&y={y}',
  VECTOR:
    'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
  TOPOGRAPHIC: 'https://demo.mapserver.org/cgi-bin/wms?',
  detail: (countryName: string) =>
    `https://restcountries.com/v3.1/name/${countryName}`,
}
