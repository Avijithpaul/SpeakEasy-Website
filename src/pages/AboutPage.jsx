import { Link } from 'react-router-dom'
import './AboutPage.css'

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    bio: 'Former ESL teacher with 10+ years helping non-native speakers master English.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
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

function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <span className="section-label">About Us</span>
          <h1>Empowering Millions to<br /><span className="gradient-text">Speak With Confidence</span></h1>
          <p>We're on a mission to make English speaking practice accessible, effective, and enjoyable for learners worldwide.</p>
        </div>
      </section>

      {/* Story */}
      <section className="story-section section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                SpeakEasy was born from a simple observation: millions of English learners know grammar and vocabulary, but struggle to speak confidently in real situations.
              </p>
              <p>
                Traditional learning methods focus on reading and writing, leaving speaking as an afterthought. We set out to change that by creating an immersive, interactive platform where learners can practice real-world conversations, interviews, presentations, and debates — all with instant feedback.
              </p>
              <p>
                Today, SpeakEasy helps over 50,000 learners improve their English speaking skills every month. And we're just getting started.
              </p>
            </div>
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=420&fit=crop"
                alt="Team collaboration"
                className="story-main-img"
              />
              <img
                src="https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=360&h=280&fit=crop"
                alt="English coaching session"
                className="story-float-img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="culture-strip section">
        <div className="container">
          <div className="culture-grid">
            {cultureImages.map((image, i) => (
              <div key={i} className="culture-item">
                <img src={image} alt={`SpeakEasy culture ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Believe</span>
            <h2>Our Core <span className="gradient-text">Values</span></h2>
          </div>
          <div className="values-grid">
            {values.map((value, i) => (
              <div key={i} className="value-card card">
                <span className="value-icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Team</span>
            <h2>Meet the <span className="gradient-text">People</span> Behind SpeakEasy</h2>
            <p>Passionate educators, engineers, and linguists working to transform language learning.</p>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card">
                <img src={member.image} alt={member.name} className="team-image" />
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Journey</span>
            <h2>Key <span className="gradient-text">Milestones</span></h2>
          </div>
          <div className="timeline">
            {milestones.map((milestone, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{milestone.year}</span>
                  <p>{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta section">
        <div className="container">
          <div className="cta-box">
            <h2>Join Our Community</h2>
            <p>Start your journey to confident English speaking today.</p>
            <div className="cta-actions">
              <Link to="/practice" className="btn btn-primary btn-large">
                Start Practicing
              </Link>
              <a href="mailto:hello@speakeasy.app" className="btn btn-outline btn-large">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
