import { pages } from '../../app/config-pages'

export const navigateConfig = [
  {
    href: pages.map1.pathForWatch,
    navigate: pages.map1.path,
    title: 'Карта интерактивная',
  },
  {
    href: pages.map2.pathForWatch,
    navigate: pages.map2.path,
    title: 'Карта топографическая',
  },
]
