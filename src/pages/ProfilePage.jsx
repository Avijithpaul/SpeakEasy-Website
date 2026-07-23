import { useNavigate } from 'react-router-dom'
import { useAuth, getUserDisplayName, getUserInitials } from '../hooks/useAuth'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/signin')
  }

  const displayName = getUserDisplayName(user)
  const initials = getUserInitials(user)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-3xl font-bold text-white border border-indigo-500">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white">{displayName}</h1>
              <p className="text-slate-400 mt-1">Manage your account and profile details.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-2xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Profile details</h2>
            <div className="space-y-3 text-slate-300 text-sm">
              <div>
                <p className="text-slate-400 uppercase tracking-[0.2em] text-[0.65rem] mb-1">Name</p>
                <p>{displayName}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase tracking-[0.2em] text-[0.65rem] mb-1">Email</p>
                <p>{user?.email || 'No email available'}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase tracking-[0.2em] text-[0.65rem] mb-1">Account provider</p>
                <p>{user?.providerId || 'Firebase Auth'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Profile preview</h2>
            <p className="text-slate-400 mb-5">Use this page to verify your profile picture, display name and email.</p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xl font-semibold text-white bg-indigo-500">
                    {initials}
                  </div>
                )}
              </div>
              <div>
                <p className="text-white font-semibold">{displayName}</p>
                <p className="text-slate-400 text-sm">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
