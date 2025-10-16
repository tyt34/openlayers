interface IPage {
  [key: string]: {
    path: string
    /**
     * Используется для href
     */
    pathForWatch: string
  }
}

export const pages: IPage = {
  navigation: { path: '/navigation', pathForWatch: '#/navigation' },
  map: { path: '/map/:id', pathForWatch: '#/map/' },
}
