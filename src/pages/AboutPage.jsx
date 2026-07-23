import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import GlowingButton from '../components/motion/GlowingButton'
import MotionCard from '../components/motion/MotionCard'
import { containerVariants, itemVariants } from '../lib/motion/variants'
import './AboutPage.css'

const CONTACT_EMAIL = 'avijith.paul136@gmail.com'

const stats = [
  { value: '50K+', label: 'Monthly Active Learners', icon: '🚀' },
  { value: '7', label: 'Interactive Practice Modes', icon: '🎯' },
  { value: '98%', label: 'Learner Satisfaction', icon: '⭐' },
  { value: '120+', label: 'Countries Reached', icon: '🌍' },
]

const comparisonData = [
  { feature: 'Real-time Pronunciation Feedback', traditional: '❌ No', speakeasy: '⚡ Instant AI Analysis' },
  { feature: '24/7 Practice Availability', traditional: '📅 Fixed Schedules', speakeasy: '🌐 Unlimited Access' },
  { feature: 'Privacy & Data Protection', traditional: '❓ Audio Recorded', speakeasy: '🛡️ 100% In-Browser' },
  { feature: 'Cost per Session', traditional: '💰 $20 - $50/hr', speakeasy: '✨ Free Forever Core' },
  { feature: 'Real-World Scenarios', traditional: '📖 Textbooks', speakeasy: '🎭 Debates, Job Interviews' },
]

const practiceCategories = [
  { title: 'Job Interview Prep', desc: 'Conquer tech & business interviews with instant STAR method prompts.', icon: '💼', color: 'from-blue-500/20 to-cyan-500/20' },
  { title: 'Casual Conversation', desc: 'Master small talk, idioms, and natural fluency with AI buddies.', icon: '💬', color: 'from-purple-500/20 to-pink-500/20' },
  { title: 'Debate & Arguments', desc: 'Sharpen counter-arguments, logic structuring, and fast thinking.', icon: '⚡', color: 'from-amber-500/20 to-orange-500/20' },
  { title: 'Public Speaking', desc: 'Overcome stage fright with speech pacing and cadence analysis.', icon: '🎤', color: 'from-emerald-500/20 to-teal-500/20' },
]

const methodologySteps = [
  {
    step: '01',
    title: 'Real-World Scenarios',
    description: 'Ditch static grammar sheets. Practice with realistic conversations, job interviews, and debate topics.',
    icon: '🗣️',
  },
  {
    step: '02',
    title: 'Instant Feedback Loop',
    description: 'Get immediate breakdown on pronunciation, vocabulary variety, and speaking speed as you talk.',
    icon: '⚡',
  },
  {
    step: '03',
    title: 'Browser-Based Privacy',
    description: 'Your voice processed securely. Zero permanent recording storage keeps your practice environment stress-free.',
    icon: '🛡️',
  },
]

const testimonials = [
  {
    quote: "SpeakEasy gave me the confidence to finally pass my tech job interview in English. The real-time feedback is game-changing!",
    author: "Elena Rostova",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "I've tried apps for years, but nothing helped me speak fluidly until I started doing daily conversation practice here.",
    author: "Kenji Sato",
    role: "Product Designer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "The privacy-first approach gave my students the freedom to practice speaking without feeling self-conscious.",
    author: "Maria Santos",
    role: "Language Educator",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  },
]

const faqs = [
  {
    q: "Is SpeakEasy completely free to use?",
    a: "Yes! Our core practice modes are free for learners everywhere. We believe quality language practice should be accessible to everyone."
  },
  {
    q: "How does SpeakEasy protect my privacy?",
    a: "All voice processing runs securely right inside your browser session. We do not store or sell your audio recordings anywhere."
  },
  {
    q: "What practice modes are currently available?",
    a: "We currently support 7 distinct modes including Casual Conversation, Job Interview Prep, Vocabulary Drills, Debate Practice, and Public Speaking."
  },
  {
    q: "Can I use SpeakEasy on my smartphone?",
    a: "Absolutely. SpeakEasy is fully responsive and works directly in any modern mobile browser without requiring app installations."
  }
]

const team = [
  {
    name: 'Avijith Paul',
    role: 'Founder & CEO',
    bio: 'EdTech innovator and full-stack engineer building AI solutions for global language learners.',
    image: 'https://i.ibb.co.com/35qHzMTw/eb9087fa-0c5a-4b64-8bd4-7d0f284cbcbe.png',
  },
  {
    name: 'Michael Roberts',
    role: 'Head of Product',
    bio: 'EdTech veteran passionate about making language learning accessible to everyone.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Learning Science',
    bio: 'PhD in Applied Linguistics, specializing in speech acquisition and fluency development.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'David Kim',
    role: 'Lead Engineer',
    bio: 'Full-stack developer focused on creating seamless, accessible web experiences.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
  },
]

const milestones = [
  { year: '2024', event: 'SpeakEasy founded with a mission to democratize English learning' },
  { year: '2024', event: 'Launched beta with 3 practice modes' },
  { year: '2025', event: 'Reached 10,000 active users' },
  { year: '2025', event: 'Added conversation and interview practice' },
  { year: '2026', event: 'Expanded to 7 practice modes with 50K+ users' },
]

const values = [
  {
    icon: '🎯',
    title: 'Accessibility',
    description: 'English learning should be free and available to everyone, regardless of location or background.',
  },
  {
    icon: '🔬',
    title: 'Science-Based',
    description: 'Our methods are grounded in linguistic research and proven language acquisition techniques.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'Your voice data stays in your browser. We never collect or store your recordings.',
  },
  {
    icon: '🌱',
    title: 'Continuous Growth',
    description: 'We constantly improve based on user feedback and the latest research.',
  },
]

const cultureImages = [
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop',
]

const SUBJECTS = [
  'General Inquiry',
  'Feature Request',
  'Bug Report',
  'Partnership',
  'Press & Media',
  'Other',
]

function buildGmailUrl({ name, email, subject, message }) {
  const fullSubject = `[SpeakEasy] ${subject} — from ${name}`
  const body = `Hi SpeakEasy team,\n\n${message}\n\n---\nSent by: ${name}\nReply to: ${email}`
  const params = new URLSearchParams({
    to: CONTACT_EMAIL,
    su: fullSubject,
    body,
  })
  return `https://mail.google.com/mail/?view=cm&fs=1&${params.toString()}`
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email is required'
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = 'Please write at least 10 characters'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    const url = buildGmailUrl(form)
    window.open(url, '_blank', 'noopener,noreferrer')
    setSent(true)
    setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' })
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="contact-success p-8 text-center bg-emerald-500/10 rounded-2xl border border-emerald-500/30"
      >
        <span className="contact-success-icon text-4xl block mb-2">✉️</span>
        <h3 className="text-xl font-bold text-white mb-2">Gmail Opened!</h3>
        <p className="text-gray-300 mb-6">Your message draft is ready in Gmail. Hit Send to reach us — we reply within 24 hours.</p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          className="btn btn-outline px-6 py-2 rounded-xl border border-white/20 text-white"
          onClick={() => setSent(false)}
        >
          Send another message
        </motion.button>
      </motion.div>
    )
  }

  return (
    <form className="contact-form space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="contact-field flex flex-col gap-1">
          <label htmlFor="contact-name" className="text-sm font-medium text-gray-300">Your name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-rose-400">
                {errors.name}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="contact-field flex flex-col gap-1">
          <label htmlFor="contact-email" className="text-sm font-medium text-gray-300">Your email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-rose-400">
                {errors.email}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="contact-field flex flex-col gap-1">
        <label htmlFor="contact-subject" className="text-sm font-medium text-gray-300">Subject</label>
        <select
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="p-3 bg-slate-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="contact-field flex flex-col gap-1">
        <label htmlFor="contact-message" className="text-sm font-medium text-gray-300">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Tell us how we can help…"
          value={form.message}
          onChange={handleChange}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
        <AnimatePresence>
          {errors.message && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-rose-400">
              {errors.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        Open in Gmail
      </motion.button>
    </form>
  )
}

function FaqAccordionItem({ faq, isOpen, onToggle, id }) {
  const contentId = `faq-content-${id}`

  return (
    <div className="faq-card card overflow-hidden mb-4 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md transition-colors hover:border-white/20">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full text-left p-6 flex justify-between items-center focus:outline-none cursor-pointer"
      >
        <span className="text-lg font-semibold text-white">{faq.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl opacity-70 ml-4"
        >
          🔽
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 text-gray-300 leading-relaxed border-t border-white/5">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function InteractiveSimulator() {
  const [isSimulating, setIsSimulating] = useState(false)

  return (
    <section className="demo-simulator-section section relative py-16 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
      <div className="container max-w-4xl mx-auto text-center">
        <span className="section-label inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
          Interactive Live Demo
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          See How Real-Time Feedback Works
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Click the simulator microphone below to test our real-time voice rhythm and pronunciation analysis UI.
        </p>

        <div className="simulator-card p-8 rounded-3xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="audio-wave flex items-center justify-center gap-1.5 h-16 w-full max-w-xs">
              {[40, 70, 30, 90, 50, 80, 20, 60, 100, 40].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: isSimulating ? [`${h / 2}%`, `${h}%`, `${h / 3}%`] : '20%' }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.08 }}
                  className="w-2 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-full"
                />
              ))}
            </div>

            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${isSimulating
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/30 animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                }`}
            >
              <span>{isSimulating ? '🎙️ Stop Simulation' : '🎙️ Test Live Audio Feedback'}</span>
            </button>

            {isSimulating && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-4 w-full mt-4 text-center border-t border-white/10 pt-6"
              >
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs text-gray-400">Pacing Speed</p>
                  <p className="text-lg font-bold text-emerald-400">135 WPM (Optimal)</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs text-gray-400">Clarity Index</p>
                  <p className="text-lg font-bold text-indigo-400">96.4%</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs text-gray-400">Filler Words</p>
                  <p className="text-lg font-bold text-amber-400">0 Detected</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (newsletterEmail) {
      setSubscribed(true)
      setNewsletterEmail('')
    }
  }

  return (
    <div className="about-page overflow-x-hidden text-gray-200">
      {/* Hero */}
      <section className="about-hero relative py-20 bg-gradient-to-b from-indigo-950/50 via-slate-900 to-slate-950">
        <div className="container text-center relative z-10 max-w-4xl mx-auto px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="section-label inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white mb-4 border border-white/20 backdrop-blur-md"
          >
            About Us
          </motion.span>

          <AnimatedHeading
            text="Empowering Millions to"
            size="xl"
            gradient={false}
            className="!mb-1 text-4xl md:text-6xl font-extrabold text-white"
          />
          <AnimatedHeading
            text="Speak With Confidence"
            size="xl"
            className="!mt-0 text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed mt-6"
          >
            We are on a mission to make English speaking practice accessible, instant, and private for learners around the world.
          </motion.p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="stats-banner-section py-12 bg-white/5 border-y border-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEW SECTION 1: Practice Categories Grid */}
      <section className="categories-section py-16 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Practice Modes</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Tailored for Every Goal</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceCategories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className={`p-6 rounded-3xl bg-gradient-to-b ${cat.color} border border-white/10 backdrop-blur-md flex flex-col justify-between`}
              >
                <div>
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="story-section py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Our Origin</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Our Story</h2>
              <p className="text-gray-300 leading-relaxed">
                SpeakEasy was born from a simple observation: millions of English learners know grammar and vocabulary, but struggle to speak confidently in real situations.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Traditional learning methods focus on reading and writing, leaving speaking as an afterthought. We set out to change that by creating an immersive, interactive platform where learners can practice real-world conversations, interviews, and debates.
              </p>
            </motion.div>

            <div className="relative">
              <img
                src="https://i.ibb.co.com/35qHzMTw/eb9087fa-0c5a-4b64-8bd4-7d0f284cbcbe.png"
                alt="Story banner"
                className="rounded-3xl border border-white/10 shadow-2xl w-full object-cover h-130"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <InteractiveSimulator />

      {/* Methodology / How It Works */}
      <section className="methodology-section py-16 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Methodology</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Designed for Rapid Fluency</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {methodologySteps.map((m, i) => (
              <MotionCard key={i} className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 relative overflow-hidden">
                <div className="text-4xl mb-4">{m.icon}</div>
                <span className="absolute top-4 right-6 text-4xl font-extrabold text-white/10">{m.step}</span>
                <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{m.description}</p>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: Comparison Section */}
      <section className="comparison-section py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Why SpeakEasy</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Traditional Methods vs. SpeakEasy</h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="p-4">Feature</th>
                  <th className="p-4">Traditional Tutors / Apps</th>
                  <th className="p-4 text-indigo-400 font-bold">SpeakEasy AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">{row.feature}</td>
                    <td className="p-4 text-gray-400">{row.traditional}</td>
                    <td className="p-4 font-bold text-cyan-300">{row.speakeasy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section py-16 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Values</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Our Core Principles</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
                <span className="text-3xl block mb-3">{v.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Meet the Team</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className="p-5 rounded-3xl bg-white/5 border border-white/10 text-center">
                <img src={m.image} alt={m.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-indigo-500/50 mb-4" />
                <h3 className="font-bold text-white text-base">{m.name}</h3>
                <span className="text-xs text-indigo-400 block mb-2">{m.role}</span>
                <p className="text-xs text-gray-400 leading-relaxed">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section py-16 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Community</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Learner Stories</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                <p className="italic text-gray-300 text-sm mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.author}</h4>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <FaqAccordionItem key={i} id={i} faq={faq} isOpen={openFaq === i} onToggle={() => toggleFaq(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: Practice Reminder Newsletter */}
      <section className="newsletter-section py-16 bg-indigo-950/40 border-y border-indigo-500/20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <span className="text-3xl block mb-2">📬</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Get Daily Speaking Topics in Your Inbox</h2>
          <p className="text-sm text-gray-300 mb-6">Join 15,000+ learners receiving 3-minute daily conversation prompts.</p>

          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-300 font-medium">
              🎉 You're subscribed! Check your inbox soon for your first speaking prompt.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="p-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 flex-1 focus:outline-none focus:border-indigo-400"
              />
              <button type="submit" className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Get In Touch</span>
              <h2 className="text-3xl font-extrabold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Have a question or feedback? Open a pre-filled draft in Gmail directly without creating an account.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span>✉️</span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:underline">{CONTACT_EMAIL}</a>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <span>⏱️</span>
                  <span>Response time: Under 24 hours</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <ContactSection />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-slate-900/60 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Speak English Effortlessly?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto text-sm">No signup required. Jump straight into interactive practice modes today.</p>
            <div className="flex justify-center gap-4">
              <GlowingButton as={Link} to="/practice" className="btn-large">
                Start Practicing Now
              </GlowingButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage