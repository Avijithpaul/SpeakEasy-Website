import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon-small">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="10" fill="url(#gradient2)" />
                  <path d="M12 20C12 15.58 15.58 12 20 12C24.42 12 28 15.58 28 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="20" cy="24" r="4" fill="white" />
                  <path d="M20 28V32" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gradient2" x1="0" y1="0" x2="40" y2="40">
                      <stop stopColor="#ff7a18" />
                      <stop offset="1" stopColor="#ff4d6d" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span>SpeakEasy</span>
            </Link>
            <p className="footer-desc">
              Master English speaking with interactive practice sessions, real-world conversations, and personalized feedback.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.26 10.44 22v-7.03H7.9v-2.9h2.54V9.46c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.9h-2.33V22C18.34 21.26 22 17.08 22 12.06Z"/></svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Practice</h4>
              <Link to="/practice/speaking">Free Speaking</Link>
              <Link to="/practice/conversation">Conversations</Link>
              <Link to="/practice/presentation">Presentations</Link>
              <Link to="/practice/interview">Interview Prep</Link>
            </div>
            <div className="footer-column">
              <h4>Learn</h4>
              <Link to="/practice/reading">Read Aloud</Link>
              <Link to="/practice/vocabulary">Vocabulary</Link>
              <Link to="/practice/debate">Debate Practice</Link>
              <Link to="/features">All Features</Link>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <Link to="/about#contact">Contact</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 SpeakEasy. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
