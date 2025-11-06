import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🌊 Adopt a Coral
        </Link>
        <div className="navbar-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
          <Link 
            to="/learn" 
            className={location.pathname === '/learn' ? 'active' : ''}
          >
            Learn
          </Link>
          <Link 
            to="/donation" 
            className={location.pathname === '/donation' ? 'active' : ''}
          >
            Donate
          </Link>
          <Link 
            to="/admin" 
            className={location.pathname === '/admin' ? 'active' : ''}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

