import { useState, useEffect, useRef } from 'react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import BackButton from './ui/BackButton'
import './DebatePractice.css'

const debateTopics = [
  {
    id: 1,
    topic: "Remote work should be the default for all office jobs",
    category: "Work",
    proArguments: ["Better work-life balance", "Reduced commute stress", "Lower office costs", "Access to global talent"],
    conArguments: ["Harder collaboration", "Social isolation", "Blurred work boundaries", "Security concerns"],
  },
  {
    id: 2,
    topic: "Social media does more harm than good",
    category: "Technology",
    proArguments: ["Mental health impacts", "Spread of misinformation", "Privacy concerns", "Addiction issues"],
    conArguments: ["Global connectivity", "Business opportunities", "News accessibility", "Community building"],
  },
  {
    id: 3,
    topic: "Artificial intelligence will create more jobs than it destroys",
    category: "Technology",
    proArguments: ["New industries emerge", "Augments human capabilities", "Historical tech patterns", "Creates AI-related jobs"],
    conArguments: ["Automation of routine tasks", "Faster than adaptation", "Wealth concentration", "Skill gap widening"],
  },
  {
    id: 4,
    topic: "University education is no longer necessary for career success",
    category: "Education",
    proArguments: ["Alternative learning paths", "High tuition costs", "Self-taught success stories", "Skills over degrees"],
    conArguments: ["Networking opportunities", "Structured learning", "Required for some fields", "Critical thinking development"],
  },
  {
    id: 5,
    topic: "Electric vehicles should completely replace gasoline cars by 2035",
    category: "Environment",
    proArguments: ["Climate change mitigation", "Cleaner air in cities", "Lower operating costs", "Energy independence"],
    conArguments: ["Infrastructure challenges", "Battery production impact", "Range anxiety", "High upfront costs"],
  },
  {
    id: 6,
    topic: "Four-day work week should be standard",
    category: "Work",
    proArguments: ["Increased productivity", "Better mental health", "More family time", "Reduced burnout"],
    conArguments: ["Coverage challenges", "Client expectations", "Industry variations", "Pay concerns"],
  },
]

function DebatePractice() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedSide, setSelectedSide] = useState(null)
  const [phase, setPhase] = useState('select')
  const [timeLeft, setTimeLeft] = useState(90)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)
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

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            setIsRunning(false)
            stopListening()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning, stopListening])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic)
    setPhase('side')
  }

  const handleSelectSide = (side) => {
    setSelectedSide(side)
    setPhase('prepare')
    setTimeLeft(90)
    resetTranscript()
  }

  const handleStartDebate = () => {
    setPhase('debate')
    setIsRunning(true)
    startListening()
  }

  const handleFinish = () => {
    setIsRunning(false)
    clearInterval(timerRef.current)
    stopListening()
    setPhase('review')
  }

  const handleReset = () => {
    setPhase('select')
    setSelectedTopic(null)
    setSelectedSide(null)
    setTimeLeft(90)
    setIsRunning(false)
    clearInterval(timerRef.current)
    resetTranscript()
  }

  const arguments_ = selectedSide === 'pro' ? selectedTopic?.proArguments : selectedTopic?.conArguments
  const opposingArgs = selectedSide === 'pro' ? selectedTopic?.conArguments : selectedTopic?.proArguments

  if (!isSupported) {
    return (
      <div className="debate-practice">
        <BackButton />
        <div className="card error-card">
          <h2>Not Supported</h2>
          <p>Speech recognition is not supported in your browser.</p>
        </div>
      </div>
    )
  }

  if (phase === 'select') {
    return (
      <div className="debate-practice">
        <BackButton />
        <h1 className="section-title">Debate Practice</h1>
        <p className="section-desc">Choose a topic and defend your position with persuasive arguments.</p>

        <div className="topic-list">
          {debateTopics.map((topic) => (
            <button
              key={topic.id}
              className="debate-topic-card"
              onClick={() => handleSelectTopic(topic)}
            >
              <span className="topic-category-badge">{topic.category}</span>
              <p className="topic-statement">{topic.topic}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (phase === 'side') {
    return (
      <div className="debate-practice">
        <button className="back-btn" onClick={() => setPhase('select')}>← Back to topics</button>
        
        <div className="topic-display">
          <span className="topic-category-badge">{selectedTopic.category}</span>
          <h2>"{selectedTopic.topic}"</h2>
        </div>

        <h3 className="side-prompt">Choose your side:</h3>

        <div className="side-selection">
          <button className="side-card pro" onClick={() => handleSelectSide('pro')}>
            <span className="side-icon">👍</span>
            <h4>For (Pro)</h4>
            <p>Argue in favor of this statement</p>
          </button>
          <button className="side-card con" onClick={() => handleSelectSide('con')}>
            <span className="side-icon">👎</span>
            <h4>Against (Con)</h4>
            <p>Argue against this statement</p>
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'prepare') {
    return (
      <div className="debate-practice">
        <button className="back-btn" onClick={() => setPhase('side')}>← Change side</button>

        <div className="topic-display compact">
          <p className="position-label">
            You are arguing <strong>{selectedSide === 'pro' ? 'FOR' : 'AGAINST'}</strong>:
          </p>
          <h2>"{selectedTopic.topic}"</h2>
        </div>

        <div className="preparation-section">
          <h3>🎯 Your Key Arguments</h3>
          <ul className="argument-list">
            {arguments_.map((arg, i) => (
              <li key={i}>{arg}</li>
            ))}
          </ul>
        </div>

        <div className="preparation-section opposing">
          <h3>⚔️ Counter Their Points</h3>
          <p className="opposing-intro">Be ready to address these opposing arguments:</p>
          <ul className="argument-list muted">
            {opposingArgs.map((arg, i) => (
              <li key={i}>{arg}</li>
            ))}
          </ul>
        </div>

        <div className="start-debate-section">
          <p>You'll have 90 seconds to present your argument.</p>
          <button className="btn btn-primary btn-large" onClick={handleStartDebate}>
            🎤 Start Debate
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'debate') {
    return (
      <div className="debate-practice">
        <div className="debate-header">
          <p className="position-label">
            Arguing <strong>{selectedSide === 'pro' ? 'FOR' : 'AGAINST'}</strong>
          </p>
          <h2>"{selectedTopic.topic}"</h2>
        </div>

        <div className="debate-timer">
          <div className={`timer-value ${timeLeft < 30 ? 'warning' : ''} ${timeLeft < 10 ? 'critical' : ''}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="timer-bar">
            <div 
              className="timer-fill" 
              style={{ width: `${(timeLeft / 90) * 100}%` }}
            />
          </div>
        </div>

        <div className="key-points-reminder">
          <h4>Remember your key points:</h4>
          <div className="points-row">
            {arguments_.map((arg, i) => (
              <span key={i} className="point-chip">{arg}</span>
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="live-speech">
          <div className="speech-indicator">
            <span className="pulse-dot"></span>
            <span>Recording...</span>
          </div>
          <div className="speech-content">
            {transcript || interimTranscript ? (
              <>
                <span>{transcript}</span>
                <span className="interim">{interimTranscript}</span>
              </>
            ) : (
              <span className="placeholder">Start speaking to defend your position...</span>
            )}
          </div>
        </div>

        <div className="debate-controls">
          <button className="btn btn-primary btn-large" onClick={handleFinish}>
            ✓ Finish Argument
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'review') {
    const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0

    return (
      <div className="debate-practice">
        <div className="review-header">
          <span className="review-icon">🏆</span>
          <h2>Debate Complete!</h2>
          <p>You argued <strong>{selectedSide === 'pro' ? 'FOR' : 'AGAINST'}</strong> the topic.</p>
        </div>

        <div className="review-stats">
          <div className="stat-item">
            <span className="stat-value">{wordCount}</span>
            <span className="stat-label">Words</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{90 - timeLeft}s</span>
            <span className="stat-label">Duration</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{Math.round(wordCount / ((90 - timeLeft) / 60) || 0)}</span>
            <span className="stat-label">WPM</span>
          </div>
        </div>

        <div className="transcript-review">
          <h4>Your Argument:</h4>
          <p>{transcript || "No speech recorded"}</p>
        </div>

        <div className="review-actions">
          <button className="btn btn-secondary" onClick={() => {
            setPhase('prepare')
            setTimeLeft(90)
            resetTranscript()
          }}>
            Try Again
          </button>
          <button className="btn btn-primary" onClick={handleReset}>
            New Topic
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default DebatePractice
