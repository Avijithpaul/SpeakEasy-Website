import { missingFirebaseKeys, initError } from '../../firebase'

const envKeyMap = {
  apiKey: 'VITE_FIREBASE_API_KEY',
  authDomain: 'VITE_FIREBASE_AUTH_DOMAIN',
  projectId: 'VITE_FIREBASE_PROJECT_ID',
  appId: 'VITE_FIREBASE_APP_ID',
}

export default function FirebaseSetupBanner() {
  if (initError) {
    return (
      <div className="auth-config-warning" role="alert">
        <strong>Firebase failed to start.</strong>
        <p>Check your <code>.env</code> values and restart the dev server (<code>npm run dev</code>).</p>
        <p className="auth-config-detail">{initError.message}</p>
      </div>
    )
  }

  if (missingFirebaseKeys.length === 0) {
    return null
  }

  return (
    <div className="auth-config-warning" role="alert">
      <strong>Firebase is not set up yet.</strong>
      <ol className="auth-setup-steps">
        <li>
          Copy <code>.env.example</code> to <code>.env</code> in the project root.
        </li>
        <li>
          In{' '}
          <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer">
            Firebase Console
          </a>
          , create a project → add a Web app → copy the config values into <code>.env</code>.
        </li>
        <li>
          Enable <strong>Authentication</strong> → sign-in methods: <strong>Email/Password</strong> and{' '}
          <strong>Google</strong>.
        </li>
        <li>
          Restart the dev server after saving <code>.env</code>.
        </li>
      </ol>
      <p className="auth-config-detail">
        Missing: {missingFirebaseKeys.map((key) => envKeyMap[key] || key).join(', ')}
      </p>
    </div>
  )
}
