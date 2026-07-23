import { motion } from 'framer-motion'

const stateColors = {
  idle: 'from-slate-400/15 via-orange-300/10 to-slate-400/15',
  recording: 'from-orange-300/50 via-rose-300/40 to-amber-300/50',
  success: 'from-orange-300/45 via-amber-300/35 to-rose-300/40',
  warning: 'from-amber-300/45 via-orange-300/35 to-red-300/40',
  error: 'from-red-300/45 via-rose-300/35 to-orange-300/40',
}

export default function GlowingBorder({
  children,
  active = false,
  state = 'idle',
  className = '',
}) {
  const gradient = stateColors[state] || stateColors.idle

  return (
    <div className={`relative rounded-2xl p-px ${className}`}>
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient}`}
        animate={
          active
            ? { opacity: [0.35, 0.55, 0.35] }
            : { opacity: 0.2 }
        }
        transition={
          active
            ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.4 }
        }
      />
      <motion.div className="relative rounded-2xl overflow-hidden">{children}</motion.div>
    </div>
  )
}
