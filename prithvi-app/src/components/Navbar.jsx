import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, logout, getCurrentUser } from '../utils/auth'
import logo from '../assets/logo.png'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const isAuth = isAuthenticated()
  const user = getCurrentUser()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">

          {/* LEFT: LOGO + TEXT */}
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              alt="Prithvi Logo"
              className="navbar-logo-img"
            />
            <span className="brand-text">Prithvi</span>
          </Link>

          {/* CENTER: NAV LINKS */}
          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/">Home</Link>
            <Link to="/schedule-pickup">Schedule Pickup</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
          </div>

          {/* RIGHT: AUTH */}
          <div className="navbar-auth">
            {isAuth ? (
              <>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
                <Link to="/profile" className="navbar-profile-icon">
                  👤
                </Link>
              </>
            ) : (
              <Link to="/login">
                <button className="btn-login">Login</button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
