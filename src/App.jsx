import { useEffect } from 'react'
import ProfilePage from './pages/ProfilePage'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import MarketingLayout from './layouts/MarketingLayout'
import DashboardLayout from './layouts/DashboardLayout'
import AuthLayout from './layouts/AuthLayout'
import GuestRoute from './components/auth/GuestRoute'
import ProtectedRoute from './components/auth/ProtectedRoute'
import HomePage from './pages/HomePage'
import PracticePage from './pages/PracticePage'
import FeaturesPage from './pages/FeaturesPage'
import AboutPage from './pages/AboutPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import SpeakingPractice from './components/SpeakingPractice'
import ReadingPractice from './components/ReadingPractice'
import VocabularyPractice from './components/VocabularyPractice'
import ConversationPractice from './components/ConversationPractice'
import PresentationPractice from './components/PresentationPractice'
import InterviewPractice from './components/InterviewPractice'
import DebatePractice from './components/DebatePractice'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
        </Route>

        <Route path="/practice" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<PracticePage />} />
            <Route path="speaking" element={<SpeakingPractice />} />
            <Route path="vocabulary" element={<VocabularyPractice />} />
            <Route path="reading" element={<ReadingPractice />} />
            <Route path="conversation" element={<ConversationPractice />} />
            <Route path="presentation" element={<PresentationPractice />} />
            <Route path="interview" element={<InterviewPractice />} />
            <Route path="debate" element={<DebatePractice />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App