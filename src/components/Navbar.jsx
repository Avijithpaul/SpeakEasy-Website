import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState('night')
  const location = useLocation()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    const initialTheme = savedTheme || (prefersLight ? 'light' : 'night')

    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'night' ? 'light' : 'night'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="url(#gradient)" />
              <path d="M12 20C12 15.58 15.58 12 20 12C24.42 12 28 15.58 28 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="24" r="4" fill="white" />
              <path d="M20 28V32" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#ff7a18" />
                  <stop offset="1" stopColor="#ff4d6d" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">SpeakEasy</span>
        </Link>

        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className={`nav-link ${isActive('/features') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            to="/practice" 
            className={`nav-link ${isActive('/practice') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Practice
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light and night mode">
            <span className="theme-icon" aria-hidden="true">{theme === 'night' ? '☀' : '🌙'}</span>
            <span>{theme === 'night' ? 'Light Mode' : 'Night Mode'}</span>
          </button>
          <Link to="/practice" className="btn btn-primary">
            Start Learning
          </Link>
        </div>

        <button className="theme-toggle-mobile" onClick={toggleTheme} aria-label="Toggle light and night mode">
          <span className="theme-icon" aria-hidden="true">{theme === 'night' ? '☀' : '🌙'}</span>
          <span>{theme === 'night' ? 'Light' : 'Night'}</span>
        </button>

        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
