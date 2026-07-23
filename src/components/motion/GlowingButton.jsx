import { motion } from 'framer-motion'
import { spring } from '../../lib/motion/variants'

const variants = {
  primary: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] shadow-sm',
  ghost: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent)]/25 hover:text-[var(--text-primary)]',
  danger: 'bg-red-400/80 text-white hover:bg-red-400',
}

export default function GlowingButton({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}) {
  const activeVariant = variants[variant] || variants.primary

  return (
    <motion.button
      type="button"
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98, transition: spring.snappy }}
      transition={spring.snappy}
      className={`group relative isolate overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-300 will-change-transform disabled:cursor-not-allowed disabled:opacity-50 ${activeVariant} ${className}`}
      {...props}
    >
      <span className="relative flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  )
}
