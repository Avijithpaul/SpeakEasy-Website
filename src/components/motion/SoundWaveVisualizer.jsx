import { useMemo } from 'react'
import { motion } from 'framer-motion'

const BAR_COUNT = 32

export default function SoundWaveVisualizer({
  isActive = false,
  hasError = false,
  className = '',
  barCount = BAR_COUNT,
}) {
  // Derive color key so useMemo can invalidate properly
  const colorKey = hasError ? 'error' : isActive ? 'active' : 'idle'

  const colorSets = {
    idle: ['bg-slate-300/40', 'bg-slate-400/30'],
    active: ['bg-orange-300/55', 'bg-amber-300/50', 'bg-rose-300/45', 'bg-orange-300/50', 'bg-amber-300/48'],
    error: ['bg-amber-400', 'bg-orange-400', 'bg-red-400'],
  }

  // Bars only recalculate when barCount or color state changes
  const bars = useMemo(() => {
    const colors = colorSets[colorKey]
    return Array.from({ length: barCount }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      baseHeight: 6 + Math.sin(i * 0.45) * 4,
      maxBoost: 14 + Math.sin(i * 0.7) * 18 + (i % 3) * 6,
      duration: 0.35 + (i % 7) * 0.06,
      delay: i * 0.025,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barCount, colorKey])

  return (
    <motion.div
      className={`flex items-center justify-center gap-[2px] h-20 ${className}`}
      animate={isActive ? { scale: [1, 1.015, 1] } : { scale: 1 }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {bars.map((bar) => (
        <motion.div
          key={bar.id}
          className={`w-[3px] rounded-full will-change-transform ${bar.color}`}
          animate={
            isActive
              ? {
                  height: [
                    bar.baseHeight,
                    bar.maxBoost,
                    bar.baseHeight + 4,
                    bar.maxBoost * 0.7,
                    bar.baseHeight,
                  ],
                }
              : { height: bar.baseHeight }
          }
          transition={
            isActive
              ? {
                  duration: bar.duration,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: bar.delay,
                }
              : { duration: 0.4, ease: 'easeOut' }
          }
        />
      ))}
    </motion.div>
  )
}
