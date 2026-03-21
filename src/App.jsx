import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PracticePage from './pages/PracticePage'
import FeaturesPage from './pages/FeaturesPage'
import AboutPage from './pages/AboutPage'
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
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/practice/speaking" element={<SpeakingPractice onBack={() => window.history.back()} />} />
          <Route path="/practice/reading" element={<ReadingPractice onBack={() => window.history.back()} />} />
          <Route path="/practice/vocabulary" element={<VocabularyPractice onBack={() => window.history.back()} />} />
          <Route path="/practice/conversation" element={<ConversationPractice onBack={() => window.history.back()} />} />
          <Route path="/practice/presentation" element={<PresentationPractice onBack={() => window.history.back()} />} />
          <Route path="/practice/interview" element={<InterviewPractice onBack={() => window.history.back()} />} />
          <Route path="/practice/debate" element={<DebatePractice onBack={() => window.history.back()} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
