import { motion } from 'framer-motion'
import { pageVariants } from '../../lib/motion/variants'

export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
}
