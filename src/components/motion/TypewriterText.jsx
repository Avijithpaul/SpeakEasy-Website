import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function TypewriterText({
  text,
  speed = 28,
  className = '',
  showCursor = true,
  onComplete,
  startDelay = 0,
}) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    let index = 0
    let intervalId

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          clearInterval(intervalId)
          setDone(true)
          onComplete?.()
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, speed, startDelay, onComplete])

  return (
    <span className={className}>
      {displayed}
      {showCursor && !done && (
        <motion.span
          className="inline-block w-[2px] h-[1em] ml-0.5 align-middle bg-gradient-to-b from-orange-400 to-rose-500 rounded-full shadow-glow-fuchsia animate-cursor-blink"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          aria-hidden="true"
        />
      )}
    </span>
  )
}
