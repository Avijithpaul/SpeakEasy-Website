import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPracticeModes } from '../lib/api'
import { practiceModesFallback } from '../data/practiceModesFallback'
import './PracticePage.css'

function PracticePage() {
  const [communicationModes, setCommunicationModes] = useState([])
  const [basicModes, setBasicModes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadModes = async () => {
      try {
        const data = await getPracticeModes()

        if (!isMounted) {
          return
        }

        setCommunicationModes(data.communicationModes || [])
        setBasicModes(data.basicModes || [])
      } catch {
        if (isMounted) {
          setCommunicationModes(practiceModesFallback.communicationModes)
          setBasicModes(practiceModesFallback.basicModes)
          setError('Using offline mode because the API server is unavailable.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadModes()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="practice-page">
      <section className="practice-hero">
        <div className="container">
          <span className="section-label">Practice Center</span>
          <h1>
            Choose Your
            <br />
            <span className="gradient-text">Practice Mode</span>
          </h1>
          <p>Select a mode below to start improving your English speaking skills.</p>
        </div>
      </section>

      <section className="communication-section section">
        <div className="container">
          <div className="section-intro">
            <h2>Communication Skills</h2>
            <p>Master real-world communication with interactive exercises.</p>
          </div>
          {isLoading && <p>Loading practice modes...</p>}
          {error && <p>{error}</p>}
          <div className="comm-grid">
            {communicationModes.map((mode) => (
              <Link key={mode.id} to={`/practice/${mode.id}`} className="comm-card">
                <div className="comm-image">
                  <img src={mode.image} alt={mode.title} />
                  <div className="comm-overlay">
                    <span className="comm-icon">{mode.icon}</span>
                  </div>
                </div>
                <div className="comm-content">
                  <h3>{mode.title}</h3>
                  <p>{mode.description}</p>
                  <div className="comm-meta">
                    <span className="meta-item">{mode.scenarios}</span>
                    <span className="meta-item">{mode.difficulty}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="basic-section section section-dark">
        <div className="container">
          <div className="section-intro">
            <h2>Basic Practice</h2>
            <p>Build your foundation with these essential practice modes.</p>
          </div>
          <div className="basic-grid">
            {basicModes.map((mode) => (
              <Link key={mode.id} to={`/practice/${mode.id}`} className="basic-card card">
                <span className="basic-icon">{mode.icon}</span>
                <div className="basic-info">
                  <h3>{mode.title}</h3>
                  <p>{mode.description}</p>
                </div>
                <span className="basic-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="tips-section section">
        <div className="container">
          <div className="tips-card">
            <div className="tips-content">
              <h2>Tips for Better Practice</h2>
              <ul>
                <li>
                  <strong>Use headphones:</strong> Get clearer audio feedback
                </li>
                <li>
                  <strong>Find a quiet space:</strong> Background noise affects recognition
                </li>
                <li>
                  <strong>Speak clearly:</strong> Enunciate words at a moderate pace
                </li>
                <li>
                  <strong>Practice daily:</strong> Consistency is key to improvement
                </li>
                <li>
                  <strong>Review feedback:</strong> Learn from transcription comparisons
                </li>
              </ul>
            </div>
            <div className="tips-image">
              <img
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=300&fit=crop"
                alt="Practice tips"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="browser-section">
        <div className="container">
          <div className="browser-note">
            <span className="note-icon">i</span>
            <div>
              <strong>Browser Compatibility</strong>
              <p>This app uses Web Speech API. For best results, use Chrome, Edge, or Safari.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PracticePage
