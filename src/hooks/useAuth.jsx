import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider, initError, isFirebaseConfigured } from '../firebase'
import { getAuthErrorMessage } from '../lib/authErrors'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(auth))
  const [redirectError, setRedirectError] = useState(null)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return undefined
    }

    let active = true

    getRedirectResult(auth)
      .then((result) => {
        if (!active || !result?.user) return
        setUser(result.user)
      })
      .catch((error) => {
        if (!active) return
        setRedirectError(getAuthErrorMessage(error))
      })
      .finally(() => {
        if (!active) return
        setLoading(false)
      })

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  const ensureConfigured = useCallback(() => {
    if (initError) {
      throw new Error(`Firebase failed to initialize: ${initError.message}`)
    }
    if (!isFirebaseConfigured || !auth) {
      throw new Error(
        'Firebase is not configured. Copy .env.example to .env, add your Firebase keys, then restart npm run dev.',
      )
    }
  }, [])

  const signUp = useCallback(async (email, password, displayName = '') => {
    ensureConfigured()
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName.trim()) {
        await updateProfile(credential.user, { displayName: displayName.trim() })
      }
      setUser({ ...credential.user })
      return credential.user
    } catch (error) {
      throw new Error(getAuthErrorMessage(error))
    }
  }, [ensureConfigured])

  const signIn = useCallback(async (email, password) => {
    ensureConfigured()
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      return credential.user
    } catch (error) {
      throw new Error(getAuthErrorMessage(error))
    }
  }, [ensureConfigured])

  const signInWithGoogle = useCallback(async () => {
    ensureConfigured()
    try {
      const credential = await signInWithPopup(auth, googleProvider)
      return credential.user
    } catch (error) {
      const code = error?.code || ''
      if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
        await signInWithRedirect(auth, googleProvider)
        return null
      }
      throw new Error(getAuthErrorMessage(error))
    }
  }, [ensureConfigured])

  const signOut = useCallback(async () => {
    ensureConfigured()
    await firebaseSignOut(auth)
  }, [ensureConfigured])

  const value = useMemo(
    () => ({
      user,
      loading,
      isConfigured: isFirebaseConfigured && Boolean(auth) && !initError,
      redirectError,
      clearRedirectError: () => setRedirectError(null),
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
    }),
    [user, loading, redirectError, signUp, signIn, signInWithGoogle, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function getUserDisplayName(user) {
  if (!user) return 'Guest'
  return user.displayName || user.email?.split('@')[0] || 'Learner'
}

export function getUserInitials(user) {
  const name = getUserDisplayName(user)
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}
