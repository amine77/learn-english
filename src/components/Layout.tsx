import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/cartes', label: 'Cartes mémo' },
  { to: '/fiches', label: 'Fiches de révision' },
  { to: '/qcm', label: 'QCM' },
]

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-emoji" aria-hidden="true">🦉</span>
          <span className="brand-name">English Boost</span>
        </div>
        <nav className="main-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>English Boost — apprendre l'anglais du collège au bac, à ton rythme 🚀</p>
      </footer>
    </div>
  )
}
