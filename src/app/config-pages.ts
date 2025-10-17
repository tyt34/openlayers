interface IPage {
  [key: string]: {
    path: string
    pathForWatch: string
  }
}

export const pages: IPage = {
  navigation: { path: '/navigation', pathForWatch: '#/navigation' },
  map1: { path: '/map/1', pathForWatch: '#/map/1' },
  map2: { path: '/map/2', pathForWatch: '#/map/2' },
}
