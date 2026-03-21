import { Link } from 'react-router-dom'
import './FeaturesPage.css'

const mainFeatures = [
  {
    icon: '💬',
    title: 'Interactive Conversations',
    description: 'Practice real-world dialogues with our AI-powered conversation scenarios. From restaurant ordering to job interviews, master everyday English interactions.',
    image: 'https://picsum.photos/seed/speakeasy-conversation/900/650',
    link: '/practice/conversation',
  },
  {
    icon: '🎯',
    title: 'Presentation Practice',
    description: 'Improve your public speaking skills with timed presentation exercises. Get real-time speech transcription and track your words per minute.',
    image: 'https://picsum.photos/seed/speakeasy-presentation/900/650',
    link: '/practice/presentation',
  },
  {
    icon: '💼',
    title: 'Interview Preparation',
    description: 'Ace your next job interview with our comprehensive question bank. Practice behavioral, situational, and technical interview questions.',
    image: 'https://picsum.photos/seed/speakeasy-interview/900/650',
    link: '/practice/interview',
  },
  {
    icon: '⚔️',
    title: 'Debate & Argumentation',
    description: 'Sharpen your critical thinking and argumentation skills. Take a stance on various topics and practice defending your position.',
    image: 'https://picsum.photos/seed/speakeasy-debate/900/650',
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

const fallbackImage = 'https://picsum.photos/seed/speakeasy-fallback/1000/700'

function FeaturesPage() {
  return (
    <div className="features-page">
      {/* Hero */}
      <section className="features-hero">
        <div className="container">
          <span className="section-label">Features</span>
          <h1>Everything You Need to<br /><span className="gradient-text">Master English Speaking</span></h1>
          <p>Comprehensive tools and practice modes designed to take your English communication skills to the next level.</p>
        </div>
      </section>

      <section className="feature-shots section">
        <div className="container">
          <div className="shots-grid">
            {featureShots.map((item, i) => (
              <div key={i} className="shot-card">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage
                  }}
                />
                <div className="shot-overlay">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="main-features section">
        <div className="container">
          {mainFeatures.map((feature, i) => (
            <div key={i} className={`feature-row ${i % 2 === 1 ? 'reverse' : ''}`}>
              <div className="feature-content">
                <span className="feature-icon-large">{feature.icon}</span>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
                <Link to={feature.link} className="btn btn-primary">
                  Try It Now
                </Link>
              </div>
              <div className="feature-image">
                <img
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage
                  }}
                />
                <div className="image-decoration"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="additional-features section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-label">More Ways to Practice</span>
            <h2>Build Your <span className="gradient-text">Foundation</span></h2>
            <p>Start with these fundamental practice modes to build your speaking confidence.</p>
          </div>
          <div className="additional-grid">
            {additionalFeatures.map((feature, i) => (
              <Link key={i} to={feature.link} className="additional-card card">
                <span className="additional-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Features */}
      <section className="tech-features section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why SpeakEasy</span>
            <h2>Built with <span className="gradient-text">Modern Technology</span></h2>
            <p>State-of-the-art features that make learning effective and enjoyable.</p>
          </div>
          <div className="tech-grid">
            {techFeatures.map((feature, i) => (
              <div key={i} className="tech-card">
                <span className="tech-icon">{feature.icon}</span>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="features-cta section section-dark">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Start Speaking?</h2>
            <p>Join thousands of learners improving their English every day.</p>
            <Link to="/practice" className="btn btn-primary btn-large">
              Start Practicing Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeaturesPage
