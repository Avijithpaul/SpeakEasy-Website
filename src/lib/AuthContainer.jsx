import React, { useState } from 'react'
import {
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle
} from './firebase'

export default function AuthContainer() {
    const [isSignUp, setIsSignUp] = useState(false)

    // Form fields
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Feedback states
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const clearForm = () => {
        setError('')
        setName('')
        setEmail('')
        setPassword('')
    }

    const toggleMode = () => {
        clearForm()
        setIsSignUp(!isSignUp)
    }

    // Handle standard Email/Password Auth
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (isSignUp) {
                await registerWithEmail(name, email, password)
            } else {
                await loginWithEmail(email, password)
            }
        } catch (err) {
            setError(formatAuthError(err.code))
        } finally {
            setLoading(false)
        }
    }

    // Handle Google Auth
    const handleGoogleSignIn = async () => {
        setError('')
        setLoading(true)
        try {
            await loginWithGoogle()
        } catch (err) {
            setError(formatAuthError(err.code))
        } finally {
            setLoading(false)
        }
    }

    // Clean reader-friendly error messages
    const formatAuthError = (code) => {
        switch (code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                return 'Invalid email or password.'
            case 'auth/email-already-in-use':
                return 'An account with this email already exists.'
            case 'auth/weak-password':
                return 'Password should be at least 6 characters.'
            case 'auth/invalid-email':
                return 'Please enter a valid email address.'
            case 'auth/popup-closed-by-user':
                return 'Google sign-in was cancelled.'
            default:
                return 'An error occurred. Please try again.'
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '24px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>

            {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block' }}>Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                )}

                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block' }}>Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block' }}>Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
            </form>

            <div style={{ margin: '20px 0', textAlign: 'center', position: 'relative' }}>
                <hr />
                <span style={{ position: 'absolute', top: '-10px', background: '#fff', padding: '0 8px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: '#666' }}>
                    OR
                </span>
            </div>

            {/* Google Sign-In Button */}
            <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                style={{ width: '100%', padding: '10px', backgroundColor: '#4285F4', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#fff" d="M12.24 10.285V13.4h6.887C18.2 15.685 15.7 18 12.24 18c-3.315 0-6-2.685-6-6s2.685-6 6-6c1.47 0 2.805.54 3.84 1.425l2.43-2.43C16.98 3.555 14.76 2.7 12.24 2.7 7.14 2.7 3 6.84 3 11.94s4.14 9.24 9.24 9.24c5.34 0 8.88-3.755 8.88-9.045 0-.615-.06-1.215-.165-1.85h-8.715z" />
                </svg>
                Sign in with Google
            </button>

            {/* Mode Switcher */}
            <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                    onClick={toggleMode}
                    style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </div>
    )
}