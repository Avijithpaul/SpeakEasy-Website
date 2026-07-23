import { useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

function useCountUp(target, duration = 0.8) {
  const spring = useSpring(0, { stiffness: 80, damping: 20 })
  const display = useTransform(spring, (v) => Math.round(v))

  useEffect(() => {
    spring.set(target)
  }, [target, spring])

  return display
}

export default function ProgressBar({
  value,
  max,
  label,
  showCount = true,
  color = 'orange',
  className = '',
  animated = true,
}) {
  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0
  const countDisplay = useCountUp(animated ? value : 0)

  const colorClasses = {
    orange: 'bg-[var(--accent)]/55',
    amber: 'bg-amber-400/50',
    rose: 'bg-rose-400/45',
    coral: 'bg-[var(--accent)]/50',
  }

  return (
    <div className={className}>
      {(label || showCount) && (
        <motion.div
          className="flex items-center justify-between mb-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {label && <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>}
          {showCount && (
            <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">
              {animated ? <motion.span>{countDisplay}</motion.span> : value} / {max}
            </span>
          )}
        </motion.div>
      )}
      <motion.div
        className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden"
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className={`h-full rounded-full ${colorClasses[color] || colorClasses.orange}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </div>
  )
}
