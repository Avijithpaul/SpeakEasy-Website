import { motion } from 'framer-motion'

const BAR_COUNT = 24

export default function AudioWaveform({ isActive = false, className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-[3px] h-16 ${className}`}>
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-[3px] rounded-full ${isActive ? 'bg-blue-500' : 'bg-[var(--border)]'}`}
          animate={
            isActive
              ? {
                  height: [8, 12 + Math.sin(i * 0.5) * 20 + 8, 8],
                }
              : { height: 8 }
          }
          transition={
            isActive
              ? {
                  duration: 0.4 + (i % 5) * 0.08,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: i * 0.03,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  )
}
