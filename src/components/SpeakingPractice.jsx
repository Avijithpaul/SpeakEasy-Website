import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import MicrophoneButton from './ui/MicrophoneButton'
import MotionCard from './motion/MotionCard'
import TypewriterText from './motion/TypewriterText'
import SoundWaveVisualizer from './motion/SoundWaveVisualizer'
import GlowingButton from './motion/GlowingButton'
import AnimatedHeading from './motion/AnimatedHeading'
import { containerVariants, itemVariants, bubbleVariants } from '../lib/motion/variants'
import { getModuleTheme } from '../lib/brand'
import { speakingPrompts, dailySpeakingGoal } from '../data/speakingPrompts'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function SpeakingPractice() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [promptKey, setPromptKey] = useState(0)

  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition()

  const currentPrompt = speakingPrompts[currentPromptIndex]
  const wordCount = useMemo(
    () => (transcript.trim() ? transcript.trim().split(/\s+/).length : 0),
    [transcript],
  )
  const glowState = error ? 'error' : isListening ? 'recording' : 'idle'
  const speakingTheme = getModuleTheme('speaking')

  useEffect(() => {
    if (!isListening) return undefined
    const interval = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [isListening])

  const handleMicToggle = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      if (!sessionStarted) setSessionStarted(true)
      startListening()
    }
  }, [isListening, sessionStarted, startListening, stopListening])

  const handleNewPrompt = useCallback(() => {
    const nextIndex = (currentPromptIndex + 1) % speakingPrompts.length
    setCurrentPromptIndex(nextIndex)
    setPromptKey((k) => k + 1)
    resetTranscript()
    setElapsedSeconds(0)
    setSessionStarted(false)
    if (isListening) stopListening()
  }, [currentPromptIndex, isListening, resetTranscript, stopListening])

  const handleReset = useCallback(() => {
    resetTranscript()
    setElapsedSeconds(0)
    setSessionStarted(false)
    if (isListening) stopListening()
  }, [isListening, resetTranscript, stopListening])

  const stats = [
    { label: 'Timer', value: formatTime(elapsedSeconds), active: isListening },
    { label: 'Goal', value: `${dailySpeakingGoal.targetMinutes}:00`, active: false },
    { label: 'Words', value: wordCount, active: false },
  ]

  if (!isSupported) {
    return (
      <MotionCard glow glowState="error" className="max-w-2xl mx-auto p-8 text-center">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Browser Not Supported</h2>
        <p className="text-[var(--text-secondary)]">
          Speech recognition requires Chrome, Edge, or Safari.
        </p>
      </MotionCard>
    )
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page heading */}
      <motion.div variants={itemVariants} className="mb-6">
        <AnimatedHeading text="Free Speaking" size="md" className="mb-1" />
        <p className="text-sm text-[var(--text-muted)]">Speak freely with SpeakEasy real-time feedback</p>
      </motion.div>

      {/* ── Prompt Card ────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <MotionCard glow glowState={glowState} className="p-6 sm:p-8 mb-6">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="flex items-center gap-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={itemVariants}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full ${speakingTheme.badge}`}
              >
                {currentPrompt.category}
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--bg-elevated)] text-[var(--text-muted)]"
              >
                {currentPrompt.difficulty}
              </motion.span>
            </motion.div>

            <GlowingButton
              variant="ghost"
              onClick={handleNewPrompt}
              className="!px-3 !py-1.5 text-xs"
            >
              New prompt →
            </GlowingButton>
          </div>

          {/* Animated typewriter prompt */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPrompt.id}-${promptKey}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed font-medium min-h-[4rem]"
            >
              <TypewriterText text={currentPrompt.prompt} speed={22} />
            </motion.div>
          </AnimatePresence>

          {/* Hint chips */}
          <motion.div
            className="flex flex-wrap gap-2 mt-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {currentPrompt.hints.map((hint) => (
              <motion.span
                key={hint}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2.5 py-1 rounded-lg border border-[var(--border)]"
              >
                💡 {hint}
              </motion.span>
            ))}
          </motion.div>
        </MotionCard>
      </motion.div>

      {/* ── Recording Studio ───────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <MotionCard glow glowState={glowState} className="p-6 sm:p-10 mb-6 overflow-hidden">
          {/* Ambient inner glow that breathes when recording */}
          <motion.div
            className={`absolute inset-0 pointer-events-none rounded-2xl ${
              isListening
                ? 'bg-[var(--accent)]/6'
                : error
                  ? 'bg-red-400/5'
                  : 'opacity-0'
            }`}
            animate={isListening ? { opacity: [0.2, 0.45, 0.2] } : { opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Stats row */}
          <div className="relative flex items-center justify-center gap-8 sm:gap-12 mb-2">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <motion.p
                  className={`text-2xl font-mono font-bold tabular-nums ${
                    stat.active
                      ? 'text-[var(--accent-light)]'
                      : 'text-[var(--text-primary)]'
                  }`}
                  animate={stat.active ? { scale: [1, 1.05, 1] } : {}}
                  transition={stat.active ? { duration: 1, repeat: Infinity } : {}}
                >
                  {stat.value}
                </motion.p>
                {/* Divider between stats */}
                {i < stats.length - 1 && (
                  <div className="absolute hidden sm:block w-px h-8 bg-[var(--border)] top-1/2 -translate-y-1/2"
                    style={{ left: `${(i + 1) * 33.33}%` }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Waveform */}
          <SoundWaveVisualizer
            isActive={isListening}
            hasError={!!error}
            className="my-6 relative z-10"
          />

          {/* Mic button + status label */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <MicrophoneButton
              isRecording={isListening}
              hasError={!!error}
              onClick={handleMicToggle}
              size="xl"
            />
            <motion.p
              className="text-sm text-[var(--text-muted)]"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {isListening
                ? 'Recording… tap to stop'
                : 'Tap the microphone to start your SpeakEasy session'}
            </motion.p>
          </div>

          {/* Error bubble */}
          <AnimatePresence>
            {error && (
              <motion.div
                variants={bubbleVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="relative z-10 mt-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </MotionCard>
      </motion.div>

      {/* ── Live Transcript ────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <MotionCard className="overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text-primary)]">Live Transcript</h3>
            {(transcript || sessionStarted) && (
              <GlowingButton
                variant="ghost"
                onClick={handleReset}
                className="!px-3 !py-1 text-xs"
              >
                Clear
              </GlowingButton>
            )}
          </div>

          <div className="px-6 py-5 min-h-[120px] max-h-[260px] overflow-y-auto">
            <AnimatePresence mode="wait">
              {transcript || interimTranscript ? (
                <motion.p
                  key="transcript"
                  variants={bubbleVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-[var(--text-primary)] leading-relaxed text-base"
                >
                  <span>{transcript}</span>
                  <motion.span
                    className="text-[var(--accent-light)]/70 italic"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    {interimTranscript}
                  </motion.span>
                </motion.p>
              ) : (
                <motion.p
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[var(--text-muted)] italic"
                >
                  Your speech will appear here in real-time…
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </MotionCard>
      </motion.div>
    </motion.div>
  )
}

export default SpeakingPractice
