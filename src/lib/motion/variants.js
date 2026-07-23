/** Shared Framer Motion variants for the SpeakEasy motion system */

export const spring = {
  snappy: { type: 'spring', stiffness: 400, damping: 28 },
  smooth: { type: 'spring', stiffness: 300, damping: 24 },
  gentle: { type: 'spring', stiffness: 200, damping: 20 },
  card: { type: 'spring', stiffness: 300, damping: 20 },
  bounce: { type: 'spring', stiffness: 500, damping: 18 },
}

export const pageVariants = {
  initial: { opacity: 0, x: 24, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -16,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.smooth,
  },
}

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -6, transition: spring.card },
  tap: { scale: 0.97, transition: spring.snappy },
}

export const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
}

export const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: spring.bounce,
  },
}
