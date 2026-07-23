import { useCallback, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FlashCard from './ui/FlashCard'
import ProgressBar from './ui/ProgressBar'
import MotionCard from './motion/MotionCard'
import GlowingButton from './motion/GlowingButton'
import CelebrationBurst from './motion/CelebrationBurst'
import AnimatedHeading from './motion/AnimatedHeading'
import { containerVariants, itemVariants, spring } from '../lib/motion/variants'
import { vocabularyWords, dailyVocabGoal } from '../data/vocabularyWords'

const SRS_OPTIONS = [
  { key: 'hard', label: 'Hard', tint: 'bg-red-400/10 text-red-500/85 border border-red-400/18', interval: 'Review in 1 day' },
  { key: 'good', label: 'Good', tint: 'bg-amber-400/10 text-amber-600/85 dark:text-amber-300/85 border border-amber-400/18', interval: 'Review in 3 days' },
  { key: 'easy', label: 'Easy', tint: 'bg-[var(--accent)]/10 text-[var(--accent-light)] border border-[var(--accent)]/18', interval: 'Review in 7 days' },
]

function speakText(text, rate = 0.86) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = rate
    speechSynthesis.speak(utterance)
  }
}

function VocabularyPractice() {
  const [deck, setDeck] = useState([...vocabularyWords])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [learnedToday, setLearnedToday] = useState(0)
  const [srsStats, setSrsStats] = useState({ easy: 0, good: 0, hard: 0 })
  const [lastRating, setLastRating] = useState(null)
  const [celebrateTrigger, setCelebrateTrigger] = useState(0)
  const [cardKey, setCardKey] = useState(0)

  const currentWord = deck[currentIndex]
  const remaining = deck.length - currentIndex
  const isLastCard = currentIndex === deck.length - 1

  const sessionProgress = useMemo(() => ({
    reviewed: currentIndex,
    total: vocabularyWords.length,
  }), [currentIndex])

  const handleFlip = useCallback(() => {
    if (!isFlipped) setIsFlipped(true)
  }, [isFlipped])

  const handleRate = useCallback(
    (rating) => {
      setSrsStats((prev) => ({ ...prev, [rating]: prev[rating] + 1 }))
      setLearnedToday((prev) => Math.min(prev + 1, dailyVocabGoal))
      setLastRating(rating)

      if (rating === 'easy' || (rating === 'good' && isLastCard)) {
        setCelebrateTrigger((t) => t + 1)
      }

      setTimeout(() => {
        setIsFlipped(false)
        setLastRating(null)
        setCardKey((k) => k + 1)

        if (currentIndex < deck.length - 1) {
          setCurrentIndex((prev) => prev + 1)
        } else {
          setCurrentIndex(0)
          setCelebrateTrigger((t) => t + 1)
        }
      }, 450)
    },
    [currentIndex, deck.length, isLastCard],
  )

  const handleShuffle = useCallback(() => {
    const shuffled = [...vocabularyWords].sort(() => Math.random() - 0.5)
    setDeck(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
    setLastRating(null)
    setCardKey((k) => k + 1)
  }, [])

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setIsFlipped(false)
      setLastRating(null)
      setCardKey((k) => k + 1)
    }
  }, [currentIndex])

  if (!currentWord) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <p className="text-[var(--text-muted)]">No vocabulary words available.</p>
      </div>
    )
  }

  const stats = [
    { label: 'Learned Today', value: `${learnedToday}/${dailyVocabGoal}`, color: 'text-[var(--accent-light)]' },
    { label: 'Remaining', value: remaining, color: 'text-amber-600/80 dark:text-amber-300/80' },
    { label: 'Easy', value: srsStats.easy, color: 'text-orange-500/75 dark:text-orange-300/75' },
    { label: 'Hard', value: srsStats.hard, color: 'text-red-500/75 dark:text-red-300/75' },
  ]

  return (
    <motion.div
      className="max-w-3xl mx-auto relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <CelebrationBurst trigger={celebrateTrigger} />

      <motion.div variants={itemVariants} className="mb-6">
        <AnimatedHeading text="Vocabulary Flashcards" size="md" className="mb-1" />
        <p className="text-sm text-[var(--text-muted)]">Flip, learn, and grow with SpeakEasy</p>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        variants={containerVariants}
      >
        {stats.map((stat) => (
          <MotionCard key={stat.label} delay={0.05} className="!rounded-xl !p-0">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="px-4 py-3 text-center"
            >
              <p className="text-xs text-[var(--text-muted)] font-medium mb-0.5">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </motion.div>
          </MotionCard>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <ProgressBar
          value={learnedToday}
          max={dailyVocabGoal}
          label="Daily vocabulary goal"
          color="orange"
          animated
          className="mb-8 bg-[var(--bg-card)]/80 backdrop-blur-xl rounded-xl border border-[var(--border)] shadow-card p-4"
        />
      </motion.div>

      {/* Flashcard */}
      <motion.div variants={itemVariants} className="mb-6" key={cardKey}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord.id}
            initial={{ opacity: 0, x: 40, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -40, rotateY: 15 }}
            transition={spring.card}
          >
            <FlashCard
              word={currentWord}
              isFlipped={isFlipped}
              onFlip={handleFlip}
              isActive={isFlipped}
            >
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  speakText(currentWord.word)
                }}
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 self-start flex items-center gap-2 text-sm font-medium text-[var(--accent-light)]"
              >
                <svg className="w-4 h-4 text-[var(--accent-light)] opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
                Listen pronunciation
              </motion.button>
            </FlashCard>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center justify-between mb-6 px-2">
        <GlowingButton variant="ghost" onClick={handlePrevious} disabled={currentIndex === 0} className="!px-3 !py-1.5 text-xs disabled:opacity-30">
          ← Previous
        </GlowingButton>
        <span className="text-sm font-medium text-[var(--text-muted)] tabular-nums">
          {sessionProgress.reviewed + 1} of {sessionProgress.total}
        </span>
        <GlowingButton variant="ghost" onClick={handleShuffle} className="!px-3 !py-1.5 text-xs">
          Shuffle ↻
        </GlowingButton>
      </motion.div>

      {/* SRS buttons */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={spring.smooth}
            className="space-y-3"
          >
            <p className="text-center text-sm font-medium text-[var(--text-muted)]">
              How well did you know this word?
            </p>
            <motion.div
              className="grid grid-cols-3 gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {SRS_OPTIONS.map((option) => (
                <motion.button
                  key={option.key}
                  type="button"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.92 }}
                  transition={spring.snappy}
                  onClick={() => handleRate(option.key)}
                  className={`${option.tint} rounded-xl py-3.5 px-4 will-change-transform`}
                >
                  <span className="block font-semibold text-sm">{option.label}</span>
                  <span className="block text-[11px] opacity-80 mt-0.5">{option.interval}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lastRating && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center text-sm text-[var(--text-muted)]"
          >
            Rated &ldquo;{lastRating}&rdquo; — moving to next card…
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLastCard && isFlipped && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={spring.bounce}
            className="mt-8 rounded-2xl p-6 text-center border border-[var(--accent)]/15 bg-[var(--accent)]/5"
          >
            <p className="text-[var(--accent-light)] font-semibold mb-1">
              Last card in deck!
            </p>
            <p className="text-sm text-[var(--text-muted)]">Rate this word to complete the session or shuffle for a new round.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default VocabularyPractice
