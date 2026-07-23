import { motion } from 'framer-motion'

const orbs = [
  { color: 'from-orange-400/8 to-rose-400/5', size: 'w-72 h-72', top: '5%', left: '10%', delay: 0 },
  { color: 'from-rose-400/6 to-pink-400/4', size: 'w-96 h-96', top: '40%', right: '5%', delay: 1 },
  { color: 'from-amber-400/6 to-orange-400/4', size: 'w-64 h-64', bottom: '10%', left: '30%', delay: 2 },
]

export default function AmbientBackground({ intensity = 'normal' }) {
  const opacity = intensity === 'subtle' ? 0.6 : 0.85

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 overflow-hidden -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.2 }}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} ${orb.size} blur-3xl will-change-transform`}
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
          }}
          animate={{
            x: [0, 20, -12, 0],
            y: [0, -15, 10, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </motion.div>
  )
}
