import { motion } from 'framer-motion'
import { wordVariants } from '../../lib/motion/variants'

export default function StaggeredText({
  text,
  className = '',
  mode = 'word',
  delay = 0,
}) {
  const units = mode === 'char' ? text.split('') : text.split(' ')

  return (
    <span className={`inline ${className}`} aria-label={text}>
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          custom={i + delay}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="inline-block will-change-transform"
          style={{ marginRight: mode === 'word' ? '0.28em' : undefined }}
        >
          {unit === ' ' ? '\u00A0' : unit}
        </motion.span>
      ))}
    </span>
  )
}
