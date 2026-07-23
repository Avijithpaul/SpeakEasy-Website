import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MotionCard from '../motion/MotionCard'

export default function PracticeModeCard({ mode, theme, delay = 0, featured = false }) {
  return (
    <MotionCard
      className={`group relative overflow-hidden p-0 ${featured ? 'ring-1 ring-[var(--accent)]/20' : ''}`}
      delay={delay}
      tilt={false}
      glow={featured}
      glowState="recording"
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${theme.line} opacity-80`} />

      <Link to={`/practice/${mode.id}`} className="block p-5">
        <div className="flex items-start gap-4">
          <motion.span
            whileHover={{ scale: 1.08, rotate: 3 }}
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-xl text-white ${theme.iconGradient} ${theme.iconShadow}`}
          >
            {mode.icon}
          </motion.span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h4 className={`font-semibold text-[var(--text-primary)] transition-colors ${theme.hover}`}>
                {mode.title}
              </h4>
              <span className="mt-0.5 flex-shrink-0 text-[var(--text-muted)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-[var(--accent-light)]">
                →
              </span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
              {mode.description}
            </p>
          </div>
        </div>

        {mode.difficulty && (
          <span className={`mt-4 inline-flex px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${theme.badge}`}>
            {mode.difficulty}
          </span>
        )}
      </Link>

      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-[var(--accent)]/10 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </MotionCard>
  )
}
