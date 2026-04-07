import './App.css'
import { HashRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { docsRoutes } from './docs/routes'

const overviewRoute = docsRoutes.find(route => route.section === 'Overview')

const groupedRoutes = {
  Foundations: docsRoutes.filter(route => route.section === 'Foundations'),
  Components: docsRoutes.filter(route => route.section === 'Components'),
} as const

export function App() {
  return (
    <HashRouter>
      <div className="app" data-brand="factory">
        <aside className="app__sidebar">
          <div className="app__brand">
            <p className="app__eyebrow">Documentation</p>
            <h1 className="app__title">Factory Design System</h1>
            <p className="app__lede">Foundations and component specs in a consistent order: overview, states, tokens, and accessibility.</p>
          </div>

          <nav className="app__nav" aria-label="Documentation sections">
            {overviewRoute && (
              <section className="app__nav-section app__nav-section--overview">
                <div className="app__nav-links">
                  <NavLink
                    className={({ isActive }) => `app__nav-link ${isActive ? 'app__nav-link--active' : ''}`}
                    to={overviewRoute.path}
                  >
                    {overviewRoute.label}
                  </NavLink>
                </div>
              </section>
            )}
            {Object.entries(groupedRoutes).map(([section, routes]) => (
              <section className="app__nav-section" key={section}>
                <h2 className="app__nav-heading">{section}</h2>
                <div className="app__nav-links">
                  {routes.map(route => (
                    <NavLink
                      className={({ isActive }) => `app__nav-link ${isActive ? 'app__nav-link--active' : ''}`}
                      key={route.path}
                      to={route.path}
                    >
                      {route.label}
                    </NavLink>
                  ))}
                </div>
              </section>
            ))}
          </nav>
        </aside>

        <main className="app__main">
          <Routes>
            <Route element={<Navigate replace to="/overview" />} path="/" />
            {docsRoutes.map(route => (
              <Route element={route.element} key={route.path} path={route.path} />
            ))}
            <Route element={<Navigate replace to="/overview" />} path="*" />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
