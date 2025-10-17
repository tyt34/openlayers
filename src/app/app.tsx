import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MapDetail } from '../pages/map-detail'
import { MapTopographic } from '../pages/map-topographic'
import { Navigation } from '../pages/navigation/navigation'
import { pages } from './config-pages'
import { type JSX } from 'react'

import './app.style.scss'

type ConfigRoutes = {
  key: string | number
  path: string | undefined
  element: JSX.Element
}[]

function App() {
  const configRoutes: ConfigRoutes = [
    {
      key: 'first',
      path: '/',
      element: (
        <Navigate
          replace
          to={pages.navigation.path}
        />
      ),
    },
    {
      key: 1,
      path: pages.navigation.path,
      element: <Navigation />,
    },
    {
      key: 2,
      path: pages.map1.path,
      element: <MapDetail />,
    },
    {
      key: 3,
      path: pages.map2.path,
      element: <MapTopographic />,
    },
  ]

  return (
    <section className="app">
      <HashRouter basename={'/'}>
        <Routes>
          {configRoutes.map((route) => {
            return (
              <Route
                key={route.key}
                path={route.path}
                element={route.element}
              />
            )
          })}
        </Routes>
      </HashRouter>
    </section>
  )
}

export default App
