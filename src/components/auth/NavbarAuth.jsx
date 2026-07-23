import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, getUserDisplayName, getUserInitials } from '../../hooks/useAuth'

export default function NavbarAuth() {
  const { user, loading, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
    return undefined
  }, [menuOpen])

  async function handleSignOut() {
    setMenuOpen(false)
    await signOut()
  }

  if (loading) {
    return (
      <div className="navbar-auth-skeleton" aria-hidden="true" />
    )
  }

  if (!user) {
    return (
      <Link to="/signin" className="btn btn-outline navbar-signin-btn">
        Sign In
      </Link>
    )
  }

  const initials = getUserInitials(user)
  const displayName = getUserDisplayName(user)

  return (
    <div className="navbar-user-menu" ref={menuRef}>
      <button
        type="button"
        className="navbar-user-btn"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-haspopup="true"
        aria-label="Account menu"
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="navbar-user-avatar" />
        ) : (
          <span className="navbar-user-initials">{initials}</span>
        )}
      </button>

      {menuOpen && (
        <div className="navbar-user-dropdown" role="menu">
          <div className="navbar-user-info">
            <p className="navbar-user-name">{displayName}</p>
            {user.email && <p className="navbar-user-email">{user.email}</p>}
          </div>
          <Link
            to="/practice/profile"
            className="navbar-user-item"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/practice"
            className="navbar-user-item"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            My Practice
          </Link>
          <button
            type="button"
            className="navbar-user-item navbar-user-signout"
            role="menuitem"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
