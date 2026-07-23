import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import GlowingButton from '../components/motion/GlowingButton'
import MotionCard from '../components/motion/MotionCard'
import { containerVariants, itemVariants } from '../lib/motion/variants'
import './HomePage.css'

const stats = [
  { value: '50K+', label: 'Active Learners' },
  { value: '7', label: 'Practice Modes' },
  { value: '100+', label: 'Scenarios' },
  { value: '4.9', label: 'User Rating' },
]

const features = [
  {
    icon: '💬',
    title: 'Real Conversations',
    description: 'Practice with interactive dialogue scenarios from restaurants to job interviews.',
  },
  {
    icon: '🎯',
    title: 'Presentation Skills',
    description: 'Master public speaking with timed presentations and speech analysis.',
  },
  {
    icon: '🎤',
    title: 'Speech Recognition',
    description: 'Get instant feedback with advanced browser-based speech recognition.',
  },
  {
    icon: '📊',
    title: 'Track Progress',
    description: 'Monitor your improvement with detailed statistics and word analysis.',
  },
]

const testimonials = [
  {
    quote: "SpeakEasy transformed my confidence in English. The conversation practice feels so real!",
    author: "Maria S.",
    role: "Business Professional",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "The interview prep module helped me land my dream job. Highly recommended!",
    author: "James L.",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Perfect for daily practice. The debate feature really sharpened my argumentation skills.",
    author: "Aisha K.",
    role: "Graduate Student",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
]

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=500&h=600&fit=crop',
    alt: 'Student practicing pronunciation',
  },
  {
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=420&fit=crop',
    alt: 'Team communication session',
  },
  {
    src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&h=420&fit=crop',
    alt: 'Online learning setup',
  },
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=600&fit=crop',
    alt: 'Group discussion in classroom',
  },
]

function HomePage() {
  return (
    <div className="home-page overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
          <div className="hero-glow hero-glow-left"></div>
          <div className="hero-glow hero-glow-right"></div>
        </div>
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="hero-badge"
          >
            <span className="badge-icon">🚀</span>
            <span>The #1 English Speaking Practice Platform</span>
          </motion.div>

          <AnimatedHeading text="Master English Speaking" className="!mb-2" size="xl" />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight"
          >
            <span className="gradient-text">With Confidence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.45 }}
            className="hero-subtitle"
          >
            Practice real conversations, ace interviews, deliver presentations, and debate topics — all with instant speech recognition feedback.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.45 }}
            className="hero-actions"
          >
            <GlowingButton as={Link} to="/practice" className="btn-large">
              Start Practicing Free
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </GlowingButton>
            <Link to="/features" className="btn btn-outline btn-large">
              See How It Works
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hero-stats"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.55 }}
          className="hero-image relative"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
            alt="People practicing English"
            className="hero-img"
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="hero-card card-1"
          >
            <span className="card-icon">🎤</span>
            <div>
              <strong>Live Speech</strong>
              <p>Recognition active</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36 }}
            whileHover={{ scale: 1.05 }}
            className="hero-card card-2"
          >
            <span className="card-icon">✓</span>
            <div>
              <strong>95% Accuracy</strong>
              <p>Great pronunciation!</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-preview section section-dark">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="section-header"
          >
            <span className="section-label">Why Choose SpeakEasy</span>
            <AnimatedHeading text="Everything You Need to" className="!mb-2" size="md" gradient={false} />
            <AnimatedHeading text="Speak Fluently" size="md" className="!mt-0" />
            <p>Our comprehensive platform covers all aspects of English speaking practice.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="features-grid"
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={itemVariants}>
                <MotionCard className="feature-card card h-full" delay={i * 0.06} float={i % 2 === 0}>
                  <span className="feature-icon">{feature.icon}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </MotionCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="features-cta"
          >
            <Link to="/features" className="btn btn-secondary">
              Explore All Features
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Practice Modes Preview */}
      <section className="modes-preview section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="modes-content"
          >
            <span className="section-label">Practice Modes</span>
            <AnimatedHeading text="7 Unique Ways to" className="!mb-2" size="md" gradient={false} />
            <AnimatedHeading text="Improve Your Skills" size="md" className="!mt-0" />
            <p>From casual conversations to formal presentations, we've got you covered with diverse practice scenarios.</p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="modes-list"
            >
              {['Conversations', 'Presentations', 'Interviews', 'Debates'].map((mode, index) => (
                <motion.div
                  key={mode}
                  variants={itemVariants}
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="mode-item cursor-pointer"
                >
                  <span className="mode-icon">{['💬', '🎯', '💼', '⚔️'][index]}</span>
                  <span>{mode}</span>
                </motion.div>
              ))}
            </motion.div>

            <Link to="/practice" className="btn btn-primary mt-4 inline-block">
              Try All Modes
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="modes-image"
          >
            <img
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&h=600&fit=crop"
              alt="Student practicing"
              className="modes-img"
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section section-dark">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-header"
          >
            <span className="section-label">Success Stories</span>
            <h2>Loved by Learners<br /><span className="gradient-text">Worldwide</span></h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="testimonials-grid"
          >
            {testimonials.map((testimonial, i) => (
              <motion.div key={i} variants={itemVariants}>
                <MotionCard className="testimonial-card card h-full" delay={i * 0.06} float={i === 1}>
                  <div className="testimonial-quote">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5V11ZM10 11V17C10 17.5304 9.78929 18.0391 9.41421 18.4142C9.03914 18.7893 8.53043 19 8 19H6C5.46957 19 4.96086 18.7893 4.58579 18.4142C4.21071 18.0391 4 17.5304 4 17V11H10ZM20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V8C14 6.93913 14.4214 5.92172 15.1716 5.17157C15.9217 4.42143 16.9391 4 18 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V11ZM20 11V17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H16C15.4696 19 14.9609 18.7893 14.5858 18.4142C14.2107 18.0391 14 17.5304 14 17V11H20Z" fill="currentColor" opacity="0.2" />
                    </svg>
                  </div>
                  <p className="testimonial-text">{testimonial.quote}</p>
                  <div className="testimonial-author">
                    <img src={testimonial.avatar} alt={testimonial.author} className="author-avatar" />
                    <div>
                      <strong>{testimonial.author}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </MotionCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-header"
          >
            <span className="section-label">Learning Moments</span>
            <h2>See the <span className="gradient-text">Experience</span> in Action</h2>
            <p>Real practice scenes designed to keep learners engaged, focused, and confident.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="gallery-grid"
          >
            {galleryImages.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className={`gallery-item gallery-item-${i + 1} overflow-hidden rounded-2xl cursor-pointer`}
              >
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="cta-card relative overflow-hidden"
          >
            <div className="cta-content z-10 relative">
              <h2>Ready to Speak<br /><span className="gradient-text">With Confidence?</span></h2>
              <p>Join thousands of learners improving their English speaking skills every day.</p>
              <Link to="/practice" className="btn btn-primary btn-large inline-block">
                Start Learning Now — It's Free
              </Link>
            </div>
            <div className="cta-decoration pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="cta-circle"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="cta-circle small"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage