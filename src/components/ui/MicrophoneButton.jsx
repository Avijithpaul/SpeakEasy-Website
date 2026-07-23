import { motion } from 'framer-motion'
import { spring } from '../../lib/motion/variants'

export default function MicrophoneButton({ isRecording, onClick, size = 'lg', disabled = false, hasError = false }) {
  const sizeClasses = {
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-28 h-28',
  }

  const iconSizes = {
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  }

  const ringSize = {
    md: 'inset-[-8px]',
    lg: 'inset-[-12px]',
    xl: 'inset-[-16px]',
  }

  const stateClass = hasError
    ? 'bg-amber-400/75 text-white'
    : isRecording
      ? 'bg-[var(--accent)]/85 text-white'
      : 'bg-[var(--accent)] text-white hover:bg-[var(--accent-light)]'

  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={isRecording ? { scale: [1, 1.02, 1] } : { scale: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {isRecording && (
        <>
          <motion.span
            className={`absolute ${ringSize[size]} rounded-full bg-[var(--accent)]/15`}
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className={`absolute ${ringSize[size]} rounded-full bg-[var(--accent)]/10`}
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          <motion.span
            className={`absolute ${ringSize[size]} rounded-full border border-[var(--accent)]/25`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled}
        whileHover={disabled ? {} : { scale: 1.06 }}
        whileTap={disabled ? {} : { scale: 0.92 }}
        transition={spring.snappy}
        className={`
          relative z-10 ${sizeClasses[size]} rounded-full flex items-center justify-center
          ${stateClass}
          transition-colors duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)]/25
          disabled:opacity-50 disabled:cursor-not-allowed will-change-transform
        `}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isRecording ? (
          <motion.span
            className="w-5 h-5 bg-white rounded-sm"
            animate={{ scale: [1, 0.85, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        ) : (
          <svg
            className={`${iconSizes[size]} text-white drop-shadow-sm`}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        )}
      </motion.button>
    </motion.div>
  )
}
