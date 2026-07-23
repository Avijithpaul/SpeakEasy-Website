import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import GlowingButton from '../components/motion/GlowingButton'
import MotionCard from '../components/motion/MotionCard'
import PracticeModeCard from '../components/practice/PracticeModeCard'
import { containerVariants, itemVariants } from '../lib/motion/variants'
import { BRAND, brandGradientBr, getModuleTheme } from '../lib/brand'
import { getPracticeModes } from '../lib/api'
import { practiceModesFallback } from '../data/practiceModesFallback'

const mockStreakDays = [
  { day: 'Mon', completed: true },
  { day: 'Tue', completed: true },
  { day: 'Wed', completed: true },
  { day: 'Thu', completed: true },
  { day: 'Fri', completed: true },
  { day: 'Sat', completed: true },
  { day: 'Sun', completed: false },
]

const mockDailyGoals = [
  { label: 'Speaking', current: 8, target: 15, unit: 'min', theme: getModuleTheme('speaking') },
  { label: 'Vocabulary', current: 6, target: 10, unit: 'words', theme: getModuleTheme('vocabulary') },
  { label: 'Reading', current: 1, target: 2, unit: 'articles', theme: getModuleTheme('reading') },
]

const recommendedExercises = [
  { id: 'speaking', title: 'Free Speaking', reason: 'Start your daily session', path: '/practice/speaking', icon: '🎤', tag: 'Popular' },
  { id: 'vocabulary', title: 'Vocabulary Flashcards', reason: '4 words due for review', path: '/practice/vocabulary', icon: '📝', tag: 'Due now' },
  { id: 'interview', title: 'Interview Simulator', reason: 'Sharpen your career English', path: '/practice/interview', icon: '💼', tag: 'Career' },
]

const growthFocus = [
  { title: 'Fluency', description: 'Speak with fewer pauses using guided prompts.', icon: '🗣️', accent: 'from-cyan-500 to-blue-500' },
  { title: 'Confidence', description: 'Build calm, clear answers with repeatable drills.', icon: '🌟', accent: 'from-fuchsia-500 to-violet-500' },
  { title: 'Vocabulary', description: 'Keep useful phrases fresh with quick recall sessions.', icon: '🧠', accent: 'from-amber-500 to-orange-500' },
]

const quickWins = [
  { title: 'Warm up', detail: 'Spend 2 minutes on a speaking prompt', icon: '⚡' },
  { title: 'Review', detail: 'Revisit 3 words before your next session', icon: '🔁' },
  { title: 'Record', detail: 'Save one short answer to track progress', icon: '🎙️' },
]

function PracticePage() {
  const [communicationModes, setCommunicationModes] = useState([])
  const [basicModes, setBasicModes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadModes = async () => {
      try {
        const data = await getPracticeModes()
        if (isMounted) {
          setCommunicationModes(data.communicationModes || [])
          setBasicModes(data.basicModes || [])
        }
      } catch {
        if (isMounted) {
          setCommunicationModes(practiceModesFallback.communicationModes)
          setBasicModes(practiceModesFallback.basicModes)
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadModes()
    return () => { isMounted = false }
  }, [])

  const allModes = useMemo(() => [...basicModes, ...communicationModes], [basicModes, communicationModes])
  const goalPercent = Math.round(
    mockDailyGoals.reduce((sum, g) => sum + g.current / g.target, 0) / mockDailyGoals.length * 100,
  )

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-8 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl sm:rounded-[32px] border border-cyan-500/20 bg-slate-950/80 p-5 sm:p-8 lg:p-10 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl"
      >
        {/* Dynamic Ambient Background Elements */}
        <div className={`absolute inset-0 ${brandGradientBr} opacity-10 blur-xl`} />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -right-20 -top-20 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-cyan-500/15 blur-[80px] sm:blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="pointer-events-none absolute -bottom-20 left-10 h-52 sm:h-72 w-52 sm:w-72 rounded-full bg-indigo-600/20 blur-[70px] sm:blur-[90px]"
        />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-48 sm:h-60 w-48 sm:w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[90px] sm:blur-[110px]" />

        {/* Grid Pattern Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 flex flex-col gap-6 lg:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-amber-300 shadow-sm shadow-amber-500/10 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              🔥 7-day streak · {goalPercent}% goals done
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan-400/90"
            >
              {BRAND.name} · <span className="text-slate-400">{BRAND.studio}</span>
            </motion.p>

            <AnimatedHeading text="Ready to speak with confidence?" className="mb-2 sm:mb-3 tracking-tight text-xl sm:text-2xl md:text-3xl" size="md" />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-xs sm:text-sm text-slate-300/90 md:text-base leading-relaxed"
            >
              Your personalized hub for speaking, vocabulary, and real-world English practice.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end w-full lg:w-auto"
          >
            <Link to="/practice/speaking" className="block w-full sm:w-auto">
              <GlowingButton className="w-full sm:w-auto !px-6 sm:!px-8 !py-3 sm:!py-3.5 !text-xs sm:!text-sm !font-semibold !bg-gradient-to-r !from-cyan-500 !to-blue-600 hover:!from-cyan-400 hover:!to-blue-500 shadow-lg shadow-cyan-500/25">
                Start Practice →
              </GlowingButton>
            </Link>

            {/* Mini Stat Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full sm:w-auto"
            >
              {[
                { label: 'Modes', value: allModes.length || 7, color: 'border-cyan-500/20 text-cyan-300' },
                { label: 'Streak', value: '7d', color: 'border-amber-500/20 text-amber-300' },
                { label: 'Today', value: `${goalPercent}%`, color: 'border-emerald-500/20 text-emerald-300' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-xl sm:rounded-2xl border ${stat.color} bg-slate-900/60 px-2.5 sm:px-4 py-2 sm:py-2.5 text-center backdrop-blur-xl transition-colors hover:border-slate-700`}
                >
                  <p className="text-base sm:text-lg font-extrabold tracking-tight text-slate-100">{stat.value}</p>
                  <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Goals + Streak Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3"
      >
        {/* Today's Goals */}
        <div className="lg:col-span-2">
          <MotionCard className="p-4 sm:p-6 border border-slate-800 bg-slate-900/50 backdrop-blur-xl" delay={0.05}>
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Today&apos;s Goals
              </h3>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-cyan-300 shadow-sm">
                {goalPercent}% complete
              </span>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {mockDailyGoals.map((goal) => {
                const percent = Math.min(100, (goal.current / goal.target) * 100);
                return (
                  <div key={goal.label}>
                    <div className="mb-1.5 sm:mb-2 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-slate-200">{goal.label}</span>
                      <span className="text-[11px] sm:text-xs font-mono font-medium text-slate-400">
                        <strong className="text-slate-100">{goal.current}</strong>/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="h-2.5 sm:h-3 overflow-hidden rounded-full bg-slate-950 p-0.5 border border-slate-800">
                      <motion.div
                        className={`h-full rounded-full ${goal.theme.bar} shadow-md shadow-cyan-500/20`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </MotionCard>
        </div>

        {/* Weekly Streak Card */}
        <div>
          <MotionCard className="p-4 sm:p-6 border border-slate-800 bg-slate-900/50 backdrop-blur-xl relative overflow-hidden" delay={0.08} float>
            <h3 className="mb-4 sm:mb-6 text-base sm:text-lg font-bold text-slate-100">Weekly Streak</h3>
            <div className="flex justify-between items-center gap-1 sm:gap-1.5">
              {mockStreakDays.map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-1.5 sm:gap-2.5">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold transition-all ${d.completed
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 shadow-lg shadow-amber-500/30'
                      : 'border border-dashed border-slate-700 bg-slate-950/50 text-slate-500'
                      }`}
                  >
                    {d.completed ? '✓' : ''}
                  </motion.div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase">{d.day}</span>
                </div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 sm:mt-6 text-center text-[11px] sm:text-xs font-medium text-amber-300/90 rounded-xl border border-amber-500/20 bg-amber-500/5 py-2 sm:py-2.5 px-2"
            >
              ⚡ Almost there — 1 day to a perfect week!
            </motion.p>
          </MotionCard>
        </div>
      </motion.div>

      {/* Growth Focus + Quick Wins */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[1.35fr_0.95fr]"
      >
        <div>
          <MotionCard className="p-4 sm:p-6 border border-slate-800 bg-slate-900/50 backdrop-blur-xl" delay={0.1} glow glowState="success">
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <AnimatedHeading text="What You'll Improve" size="sm" gradient={false} className="!mb-0 text-base sm:text-lg" />
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Growth plan
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {growthFocus.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5 sm:p-4 transition-all hover:border-cyan-500/40 hover:bg-slate-900/80 cursor-default"
                >
                  <div className={`mb-2.5 sm:mb-3 inline-flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-base sm:text-lg text-white shadow-md transition-transform group-hover:scale-110`}>
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">{item.title}</h4>
                  <p className="mt-1 text-[11px] sm:text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </MotionCard>
        </div>

        <div>
          <MotionCard className="p-4 sm:p-6 border border-slate-800 bg-slate-900/50 backdrop-blur-xl" delay={0.14} float>
            <AnimatedHeading text="Quick Wins" size="sm" gradient={false} className="!mb-3 sm:!mb-5 text-base sm:text-lg" />
            <div className="space-y-2.5 sm:space-y-3">
              {quickWins.map((tip) => (
                <motion.div
                  key={tip.title}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-slate-800/80 bg-slate-950/40 p-3 sm:p-3.5 transition-all hover:border-slate-700 cursor-default"
                >
                  <span className="mt-0.5 text-lg sm:text-xl">{tip.icon}</span>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-slate-200">{tip.title}</p>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-normal">{tip.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </MotionCard>
        </div>
      </motion.div>

      {/* Recommended Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-3 sm:mb-5 flex items-end justify-between gap-4">
          <AnimatedHeading text="SpeakEasy Recommends" size="md" className="text-lg sm:text-xl md:text-2xl" />
          <span className="hidden text-xs font-semibold tracking-wider uppercase text-slate-400 sm:block">Curated for you</span>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {recommendedExercises.map((exercise, i) => {
            const theme = getModuleTheme(exercise.id);
            return (
              <motion.div key={exercise.id} variants={itemVariants}>
                <MotionCard className="group relative overflow-hidden border border-slate-800 bg-slate-900/50 p-4 sm:p-6 backdrop-blur-xl hover:border-cyan-500/40" delay={i * 0.06} glow={i === 0} glowState="recording">
                  <Link to={exercise.path} className="block">
                    <span className={`mb-2.5 sm:mb-3 inline-block rounded-full px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${theme.badge}`}>
                      {exercise.tag}
                    </span>
                    <span className={`mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl text-lg sm:text-xl text-white ${theme.iconGradient} ${theme.iconShadow} transition-transform group-hover:scale-110`}>
                      {exercise.icon}
                    </span>
                    <h4 className={`font-bold text-sm sm:text-base text-slate-100 transition-colors ${theme.hover}`}>
                      {exercise.title}
                    </h4>
                    <p className="mt-1.5 sm:mt-2 text-xs text-slate-400 leading-relaxed">{exercise.reason}</p>
                    <span className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 transition-all group-hover:text-cyan-300">
                      Begin now <span className="transition-transform group-hover:translate-x-1.5">→</span>
                    </span>
                  </Link>
                </MotionCard>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* All Modes Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedHeading text="All SpeakEasy Modes" className="mb-3 sm:mb-5 text-lg sm:text-xl md:text-2xl" size="md" />
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 sm:h-36 animate-pulse rounded-2xl bg-slate-900/60 border border-slate-800" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {allModes.map((mode, i) => (
              <motion.div key={mode.id} variants={itemVariants}>
                <PracticeModeCard mode={mode} theme={getModuleTheme(mode.id)} delay={i * 0.04} featured={i === 0} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default PracticePage