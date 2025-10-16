import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Navigation } from '../pages/navigation/navigation'
import { pages } from './config-pages'
import { type JSX } from 'react'

import './app.scss'

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
