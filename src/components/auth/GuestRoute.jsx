import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function GuestRoute({ redirectTo = '/practice' }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-loading-spinner" aria-hidden="true" />
        <p>Loading…</p>
      </div>
    )
  }

  if (user) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
