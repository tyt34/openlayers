interface IPage {
  [key: string]: {
    path: string
    pathForWatch: string
    // pathType?: string
    // pathElement?: string
  }
}

export const pages: IPage = {
  navigation: { path: '/navigation', pathForWatch: '#/navigation' },
  map: { path: '/map', pathForWatch: '#/map' },
}
