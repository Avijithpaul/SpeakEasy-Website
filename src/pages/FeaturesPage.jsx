import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import './FeaturesPage.css'

const mainFeatures = [
  {
    icon: '💬',
    title: 'Interactive Conversations',
    description: 'Practice real-world dialogues with our AI-powered conversation scenarios. From restaurant ordering to job interviews, master everyday English interactions.',
    image: 'https://picsum.photos/seed/speakeasy-conversation/900/650',
    link: '/practice/conversation',
    badge: 'AI Powered',
  },
  {
    icon: '🎯',
    title: 'Presentation Practice',
    description: 'Improve your public speaking skills with timed presentation exercises. Get real-time speech transcription and track your words per minute.',
    image: 'https://picsum.photos/seed/speakeasy-presentation/900/650',
    link: '/practice/presentation',
    badge: 'Live WPM Tracker',
  },
  {
    icon: '💼',
    title: 'Interview Preparation',
    description: 'Ace your next job interview with our comprehensive question bank. Practice behavioral, situational, and technical interview questions.',
    image: 'https://picsum.photos/seed/speakeasy-interview/900/650',
    link: '/practice/interview',
    badge: 'STAR Method',
  },
  {
    icon: '⚔️',
    title: 'Debate & Argumentation',
    description: 'Sharpen your critical thinking and argumentation skills. Take a stance on various topics and practice defending your position.',
    image: 'https://picsum.photos/seed/speakeasy-debate/900/650',
    badge: 'Counter Arguments',
    link: '/practice/debate',
  },
]

const additionalFeatures = [
  {
    icon: '🎤',
    title: 'Free Speaking',
    description: 'Speak freely and see your words transcribed in real-time. Perfect for building confidence.',
    link: '/practice/speaking',
  },
  {
    icon: '📖',
    title: 'Read Aloud',
    description: 'Practice pronunciation by reading passages and comparing your speech to the original.',
    link: '/practice/reading',
  },
  {
    icon: '📝',
    title: 'Vocabulary Builder',
    description: 'Learn new words with pronunciation guides and practice saying them correctly.',
    link: '/practice/vocabulary',
  },
]

const techFeatures = [
  {
    icon: '🔊',
    title: 'Speech Recognition',
    description: 'Advanced browser-based speech recognition technology for instant feedback.',
  },
  {
    icon: '📊',
    title: 'Progress Analytics',
    description: 'Track your improvement with detailed statistics and performance metrics.',
  },
  {
    icon: '🌐',
    title: 'Works Offline',
    description: 'Practice anywhere, anytime. No internet required after initial load.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'Your voice data never leaves your browser. Complete privacy guaranteed.',
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    description: 'Fully responsive design works perfectly on phones, tablets, and desktops.',
  },
  {
    icon: '🆓',
    title: 'Free Forever',
    description: 'All features are completely free. No hidden costs or premium tiers.',
  },
]

const fluencyMetrics = [
  { name: 'Phonetic Accuracy', value: '98%', desc: 'Pinpoint exact word syllable mispronunciations.', color: 'from-blue-500 to-indigo-500' },
  { name: 'Speech Pacing (WPM)', value: '130 - 160', desc: 'Maintain natural cadence without rushing.', color: 'from-emerald-500 to-teal-500' },
  { name: 'Filler Word Filter', value: 'Zero Um/Uhs', desc: 'Identify hesitation markers instantly.', color: 'from-amber-500 to-orange-500' },
  { name: 'Grammar Nuance', value: 'Real-time', desc: 'Instant contextual corrections as you speak.', color: 'from-purple-500 to-pink-500' },
]

const workflowSteps = [
  { step: '01', title: 'Choose Scenario', desc: 'Select from 20+ realistic situations or custom topics.', icon: '🎯' },
  { step: '02', title: 'Speak Naturally', desc: 'Activate browser mic & speak in real-time without latency.', icon: '🎙️' },
  { step: '03', title: 'Instant Analysis', desc: 'Get live visual metrics on clarity, speed, and word choice.', icon: '⚡' },
  { step: '04', title: 'Refine & Conquer', desc: 'Review transcript, practice weak points, and level up.', icon: '🚀' },
]

const featureShots = [
  {
    title: 'Live Conversation Lab',
    image: 'https://picsum.photos/seed/speakeasy-lab/1000/640',
  },
  {
    title: 'Pronunciation Coaching',
    image: 'https://picsum.photos/seed/speakeasy-pronunciation/1000/640',
  },
  {
    title: 'Confidence Workshops',
    image: 'https://picsum.photos/seed/speakeasy-workshop/1000/640',
  },
]

const featureFaqs = [
  { q: 'Do I need a high-end microphone to use these features?', a: 'Not at all! Any standard laptop built-in microphone or simple smartphone mic works perfectly with our browser audio processing.' },
  { q: 'Can I practice offline?', a: 'Yes! Core speech recognition features cache directly in your browser session for offline practice.' },
  { q: 'Is there a limit on how many practice sessions I can run?', a: 'No limits whatsoever. Practice as many times as you want, 24/7.' },
]

const fallbackImage = 'https://picsum.photos/seed/speakeasy-fallback/1000/700'

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

function LiveFeaturePlayground() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { name: 'AI Partner', icon: '🤖', previewText: '"How would you explain your greatest project success?"', status: 'AI Listening...' },
    { name: 'Pronunciation Engine', icon: '🔊', previewText: '"Comfortable" -> /kʌmf.tə.bəl/ (98% match)', status: 'Pronunciation Verified' },
    { name: 'Pace Meter', icon: '⏱️', previewText: 'Current Pacing: 142 Words Per Minute (Ideal)', status: 'Optimal Cadence' },
  ]

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInUp}
      className="playground-section py-16 bg-slate-900/60 border-y border-white/10 my-12"
    >
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
          Interactive Feature Demo
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Try Feature Previews In Real-Time</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8 text-sm">Switch between modes below to see how our AI handles live audio feedback.</p>

        <div className="flex justify-center gap-2 md:gap-4 mb-8 flex-wrap">
          {tabs.map((tab, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-2xl font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer ${activeTab === idx
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-slate-950/80 border border-indigo-500/30 shadow-2xl max-w-2xl mx-auto relative overflow-hidden backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <span className="text-xs font-mono text-indigo-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              {tabs[activeTab].status}
            </span>
            <span className="text-xs text-gray-500 font-mono">MOD_0{activeTab + 1}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="my-6"
            >
              <p className="text-xl md:text-2xl font-semibold text-cyan-200 italic">
                {tabs[activeTab].previewText}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
            <span>Client-side Audio Engine</span>
            <span className="text-emerald-400 font-medium">⚡ 0ms Server Latency</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function FeaturesPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="features-page bg-slate-950 text-gray-200 min-h-screen overflow-x-hidden">
      {/* Hero Section with Motion */}
      <section className="features-hero relative py-20 bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-950 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4"
          >
            Features & Capabilities
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            Everything You Need to <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Master English Speaking
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive tools, speech visualizers, and interactive practice modes designed to take your English communication skills to the next level.
          </motion.p>
        </div>
      </section>

      {/* Feature Shots Grid */}
      <section className="feature-shots section py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {featureShots.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="shot-card relative rounded-3xl overflow-hidden border border-white/10 group bg-slate-900 shadow-xl cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage
                  }}
                />
                <div className="shot-overlay absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Live Feature Playground */}
      <LiveFeaturePlayground />

      {/* Main Features */}
      <section className="main-features section py-16">
        <div className="container mx-auto px-4 max-w-6xl space-y-20">
          {mainFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="feature-content flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-3 bg-white/5 rounded-2xl border border-white/10">{feature.icon}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {feature.badge}
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-white">{feature.title}</h2>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                <motion.div whileHover={{ x: 5 }} className="inline-block">
                  <Link to={feature.link} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white transition-all shadow-lg shadow-indigo-500/25">
                    Try It Now <span>→</span>
                  </Link>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="feature-image flex-1 relative w-full"
              >
                <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 group">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fluency Matrix Grid with Stagger Animation */}
      <section className="fluency-matrix py-16 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Precision Feedback</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Real-Time Fluency Matrix</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {fluencyMetrics.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-md relative overflow-hidden"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${m.color} absolute top-0 left-0`} />
                <h3 className="text-sm text-gray-400 font-medium mb-1">{m.name}</h3>
                <div className="text-3xl font-extrabold text-white my-2">{m.value}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Step-By-Step Workflow Roadmap */}
      <section className="workflow-section py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Your Path to Fluency</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-6 relative"
          >
            {workflowSteps.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 relative hover:border-indigo-500/40 transition-colors"
              >
                <span className="text-4xl font-black text-white/10 absolute top-4 right-4">{s.step}</span>
                <span className="text-3xl block mb-4">{s.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="additional-features py-16 bg-slate-900/60 border-y border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">More Ways to Practice</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Build Your Foundation</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {additionalFeatures.map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6 }}>
                <Link to={feature.link} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all flex flex-col justify-between group h-full block">
                  <div>
                    <span className="text-4xl block mb-4">{feature.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <span className="text-indigo-400 text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Features */}
      <section className="tech-features py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Why SpeakEasy</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Built with Modern Technology</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {techFeatures.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-start gap-4 hover:border-indigo-500/30 transition-all"
              >
                <span className="text-3xl p-3 bg-white/5 rounded-2xl border border-white/10">{feature.icon}</span>
                <div>
                  <h4 className="font-bold text-white text-base mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Accordion FAQ with Animated Collapse */}
      <section className="feature-faq py-16 bg-white/5 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Need Help?</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Feature Specs & Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {featureFaqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-slate-900 border border-white/10"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex justify-between items-center text-white font-bold text-base focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-indigo-400 text-lg"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm text-gray-400 border-t border-white/5 pt-3 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="features-cta py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-12 rounded-3xl bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900/80 border border-indigo-500/30 shadow-2xl relative overflow-hidden"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Start Speaking?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto text-sm">Join thousands of learners improving their English fluency every day.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link to="/practice" className="inline-block px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg transition-all shadow-xl shadow-indigo-500/30">
                Start Practicing Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default FeaturesPage