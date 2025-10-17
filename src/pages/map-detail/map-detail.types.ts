export interface CountryResponse {
  name: Name
  tld: string[]
  cca2: string
  ccn3: string
  cioc: string
  independent: boolean
  status: string
  unMember: boolean
  currencies: Record<string, Currency>
  idd: IDD
  capital: string[]
  altSpellings: string[]
  region: string
  subregion: string
  languages: Record<string, string>
  latlng: [number, number]
  landlocked: boolean
  borders: string[]
  area: number
  demonyms: Demonyms
  cca3: string
  translations: Record<string, Translation>
  flag: string
  maps: Maps
  population: number
  gini?: Record<string, number>
  fifa?: string
  car: Car
  timezones: string[]
  continents: string[]
  flags: Flag
  coatOfArms: CoatOfArms
  startOfWeek: string
  capitalInfo: CapitalInfo
  postalCode: PostalCode
}

interface Name {
  common: string
  official: string
  nativeName: Record<string, NativeName>
}

interface NativeName {
  official: string
  common: string
}

interface Currency {
  symbol: string
  name: string
}

interface IDD {
  root: string
  suffixes: string[]
}

interface Demonyms {
  eng: Gendered
  fra: Gendered
}

interface Gendered {
  f: string
  m: string
}

interface Translation {
  official: string
  common: string
}

interface Maps {
  googleMaps: string
  openStreetMaps: string
}

interface Car {
  signs: string[]
  side: string
}

interface Flag {
  png: string
  svg: string
  alt: string
}

interface CoatOfArms {
  png: string
  svg: string
}

interface CapitalInfo {
  latlng: [number, number]
}

interface PostalCode {
  format: string
  regex: string
}
