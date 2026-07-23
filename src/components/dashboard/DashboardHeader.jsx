import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { useAuth, getUserInitials } from '../../hooks/useAuth'
import { BRAND } from '../../lib/brand'

const pageTitles = {
  '/practice': { title: 'My Practice', subtitle: `${BRAND.name} Studio — your learning hub` },
  '/practice/speaking': { title: 'Free Speaking', subtitle: 'Build fluency with SpeakEasy prompts' },
  '/practice/vocabulary': { title: 'Vocabulary Flashcards', subtitle: 'Master words with spaced repetition' },
  '/practice/reading': { title: 'Read Aloud', subtitle: 'Improve comprehension and pronunciation' },
  '/practice/interview': { title: 'Interview Simulator', subtitle: 'Prepare for real-world interviews' },
  '/practice/presentation': { title: 'Presentation Skills', subtitle: 'Practice public speaking with live tips' },
  '/practice/conversation': { title: 'Conversations', subtitle: 'Interactive real-world dialogue scenarios' },
  '/practice/debate': { title: 'Debate Practice', subtitle: 'Develop persuasive argumentation skills' },
}

export default function DashboardHeader({ onMenuClick }) {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const pageInfo = pageTitles[pathname] || { title: BRAND.studio, subtitle: '' }
  const initials = user ? getUserInitials(user) : 'U'

  return (
    <header className="sticky top-0 z-20 bg-[var(--bg-card)]/90 backdrop-blur-lg border-b border-[var(--border)]">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Open navigation menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">{pageInfo.title}</h1>
            {pageInfo.subtitle && (
              <p className="text-xs sm:text-sm text-[var(--text-muted)] hidden sm:block">{pageInfo.subtitle}</p>
            )}
          </motion.div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/8 border border-[var(--accent)]/15">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-light)] opacity-80" />
            <span className="text-xs font-medium text-[var(--accent-light)]">7-day streak</span>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Toggle theme"
          >
            <span>{theme === 'night' ? '☀' : '🌙'}</span>
          </button>

          <div
            className="w-9 h-9 rounded-full bg-[var(--accent)]/12 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent-light)] text-sm font-semibold overflow-hidden"
            title={user?.displayName || user?.email || 'Guest'}
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
