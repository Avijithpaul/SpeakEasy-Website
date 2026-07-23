import { motion } from 'framer-motion'
import { spring } from '../../lib/motion/variants'
import GlowingBorder from '../motion/GlowingBorder'

export default function FlashCard({ word, isFlipped, onFlip, children, isActive = false }) {
  return (
    <GlowingBorder active={isFlipped || isActive} state={isFlipped ? 'success' : 'idle'}>
      <div className="w-full max-w-lg mx-auto" style={{ perspective: '1400px' }}>
        <motion.div
          className="relative w-full min-h-[340px] cursor-pointer will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={spring.card}
          whileHover={!isFlipped ? { scale: 1.02, y: -4 } : {}}
          onClick={onFlip}
        >
          {/* Front Side */}
          <motion.div
            className="absolute inset-0 w-full min-h-[340px] rounded-2xl bg-[var(--bg-card)]/90 backdrop-blur-xl border border-[var(--border)] shadow-glass-glow p-8 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <motion.span
              className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-light)]/80 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {word?.category} · {word?.level}
            </motion.span>
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={spring.bounce}
            >
              {word?.word}
            </motion.h2>
            <p className="text-lg text-[var(--text-muted)] font-mono">{word?.phonetic}</p>
            <motion.p
              className="mt-8 text-sm text-[var(--text-muted)]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to reveal definition
            </motion.p>
          </motion.div>

          {/* Back Side */}
          <motion.div
            className="absolute inset-0 w-full min-h-[340px] rounded-2xl bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--accent)]/4 backdrop-blur-xl border border-[var(--border)] shadow-glass-glow p-8 flex flex-col justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <p className="text-lg text-[var(--text-primary)] leading-relaxed mb-4">{word?.meaning}</p>

            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={isFlipped ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Synonyms</span>
              <motion.div
                className="flex flex-wrap gap-2 mt-2"
                initial="hidden"
                animate={isFlipped ? 'visible' : 'hidden'}
                variants={{
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
              >
                {word?.synonyms?.map((syn) => (
                  <motion.span
                    key={syn}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    className="px-3 py-1 text-sm bg-[var(--bg-card)] border border-[var(--accent)]/12 rounded-full text-[var(--text-secondary)]"
                  >
                    {syn}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <blockquote className="text-sm text-[var(--text-muted)] italic border-l-2 border-[var(--accent)]/30 pl-4">
              &ldquo;{word?.example}&rdquo;
            </blockquote>

            {children}
          </motion.div>
        </motion.div>
      </div>
    </GlowingBorder>
  )
}