import { motion } from 'framer-motion'
import { spring } from '../../lib/motion/variants'
import GlowingBorder from './GlowingBorder'

export default function MotionCard({
  children,
  className = '',
  glow = false,
  glowState = 'idle',
  layout = false,
  layoutId,
  onClick,
  delay = 0,
  tilt = true,
  float = false,
}) {
  const Wrapper = glow ? GlowingBorder : 'div'
  const wrapperProps = glow
    ? { active: glowState !== 'idle', state: glowState }
    : {}

  const hoverMotion = {
    scale: 1.02,
    y: -6,
    rotateX: tilt ? 2 : 0,
    rotateY: tilt ? -2 : 0,
    transition: spring.card,
  }

  const card = (
    <motion.div
      layout={layout}
      layoutId={layoutId}
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hoverMotion}
      whileTap={onClick ? { scale: 0.98, transition: spring.snappy } : undefined}
      onClick={onClick}
      className={`relative rounded-2xl bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--border)] shadow-card will-change-transform ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  )

  // Float wraps the already-entered card in a separate idle loop so the two
  // animations never conflict with each other.
  const inner = float ? (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay * 0.5,
      }}
      style={{ willChange: 'transform' }}
    >
      {card}
    </motion.div>
  ) : card

  return (
    <Wrapper {...wrapperProps}>
      {inner}
    </Wrapper>
  )
}
