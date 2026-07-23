import { Link, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './AuthPage.css'

export default function AuthLayout() {
  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-page-bg" aria-hidden="true" />
      <div className="auth-page-inner">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="url(#authGradient)" />
              <path d="M12 20C12 15.58 15.58 12 20 12C24.42 12 28 15.58 28 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="24" r="4" fill="white" />
              <path d="M20 28V32" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="authGradient" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#ff7a18" />
                  <stop offset="1" stopColor="#ff4d6d" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>SpeakEasy</span>
        </Link>
        <Outlet />
      </div>
    </div>
  )
}
