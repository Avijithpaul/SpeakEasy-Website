import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PARTICLE_COUNT = 24

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 280,
    y: (Math.random() - 0.5) * 200 - 40,
    color: ['#10b981', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b'][i % 5],
    size: 4 + Math.random() * 6,
    rotation: Math.random() * 360,
  }))
}

export default function CelebrationBurst({ trigger, onComplete }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!trigger) return

    setParticles(createParticles())
    const timer = setTimeout(() => {
      setParticles([])
      onComplete?.()
    }, 1200)

    return () => clearTimeout(timer)
  }, [trigger, onComplete])

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full will-change-transform"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 12px ${p.color}`,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: [1, 1, 0],
                scale: [0, 1.2, 0.4],
                rotate: p.rotation,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-emerald-400/30 blur-2xl"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
