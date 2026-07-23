import { motion } from 'framer-motion'
import StaggeredText from './StaggeredText'
import { brandGradientText } from '../../lib/brand'

export default function AnimatedHeading({
  text,
  as: Tag = 'h2',
  className = '',
  gradient = true,
  stagger = true,
  size = 'lg',
  delay = 0,
}) {
  const sizeClasses = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  }

  const gradientClass = gradient ? brandGradientText : 'text-[var(--text-primary)]'

  if (stagger) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Tag className={`font-bold tracking-tight ${sizeClasses[size]} ${className}`}>
          <StaggeredText
            text={text}
            className={gradient ? gradientClass : 'text-[var(--text-primary)]'}
            mode="word"
            delay={delay * 0.6}
          />
        </Tag>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tag className={`font-bold tracking-tight ${sizeClasses[size]} ${gradientClass} ${className}`}>
        {text}
      </Tag>
    </motion.div>
  )
}
