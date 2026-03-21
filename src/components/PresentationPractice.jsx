import { useState, useEffect, useRef } from 'react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import './PresentationPractice.css'

const topics = [
  {
    id: 1,
    category: 'Business',
    title: 'Introducing a New Product',
    description: 'Present a new product or service to potential customers or stakeholders.',
    tips: ['Start with the problem it solves', 'Highlight key features', 'Share benefits, not just features', 'End with a call to action'],
    duration: 120,
  },
  {
    id: 2,
    category: 'Education',
    title: 'Teaching a Concept',
    description: 'Explain a complex topic in simple terms to an audience.',
    tips: ['Define the concept clearly', 'Use examples and analogies', 'Check for understanding', 'Summarize key points'],
    duration: 180,
  },
  {
    id: 3,
    category: 'Personal',
    title: 'Self Introduction',
    description: 'Introduce yourself in a professional or social setting.',
    tips: ['State your name clearly', 'Share relevant background', 'Mention your interests or goals', 'Keep it concise and engaging'],
    duration: 60,
  },
  {
    id: 4,
    category: 'Persuasive',
    title: 'Convince Your Audience',
    description: 'Persuade your audience to adopt your viewpoint or take action.',
    tips: ['State your position clearly', 'Present strong evidence', 'Address counterarguments', 'Appeal to emotions and logic'],
    duration: 150,
  },
  {
    id: 5,
    category: 'Informative',
    title: 'Current Events Update',
    description: 'Present a summary of recent news or developments in your field.',
    tips: ['Lead with the most important news', 'Provide context', 'Cite sources', 'Explain the implications'],
    duration: 120,
  },
  {
    id: 6,
    category: 'Technical',
    title: 'Project Demo',
    description: 'Demonstrate a project, app, or technical solution you have built.',
    tips: ['Explain the problem first', 'Show the solution in action', 'Highlight technical decisions', 'Discuss future improvements'],
    duration: 180,
  },
]

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function PresentationPractice({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
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
            setIsFinished(true)
            stopListening()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning, stopListening])

  const handleStart = () => {
    setIsRunning(true)
    setIsFinished(false)
    startListening()
  }

  const handlePause = () => {
    setIsRunning(false)
    clearInterval(timerRef.current)
    stopListening()
  }

  const handleResume = () => {
    setIsRunning(true)
    startListening()
  }

  const handleReset = () => {
    setTimeLeft(selectedTopic.duration)
    setIsRunning(false)
    setIsFinished(false)
    clearInterval(timerRef.current)
    resetTranscript()
  }

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic)
    setTimeLeft(topic.duration)
    setIsRunning(false)
    setIsFinished(false)
    resetTranscript()
  }

  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0
  const wordsPerMinute = selectedTopic && transcript
    ? Math.round((wordCount / ((selectedTopic.duration - timeLeft) || 1)) * 60)
    : 0

  if (!isSupported) {
    return (
      <div className="presentation-practice">
        <button className="back-btn" onClick={onBack}>← Back to modes</button>
        <div className="card error-card">
          <h2>Not Supported</h2>
          <p>Speech recognition is not supported in your browser.</p>
        </div>
      </div>
    )
  }

  if (!selectedTopic) {
    return (
      <div className="presentation-practice">
        <button className="back-btn" onClick={onBack}>← Back to modes</button>
        <h1 className="section-title">Presentation Practice</h1>
        <p className="section-desc">Choose a topic and practice presenting with a timer.</p>

        <div className="topic-grid">
          {topics.map((topic) => (
            <button
              key={topic.id}
              className="topic-card"
              onClick={() => handleSelectTopic(topic)}
            >
              <span className="topic-category">{topic.category}</span>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <span className="topic-duration">⏱ {formatTime(topic.duration)}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="presentation-practice">
      <button className="back-btn" onClick={() => setSelectedTopic(null)}>← Back to topics</button>

      <div className="presentation-header">
        <span className="topic-category">{selectedTopic.category}</span>
        <h2>{selectedTopic.title}</h2>
        <p>{selectedTopic.description}</p>
      </div>

      <div className="timer-section">
        <div className={`timer-display ${timeLeft < 30 ? 'warning' : ''} ${timeLeft < 10 ? 'critical' : ''}`}>
          {formatTime(timeLeft)}
        </div>
        <div className="timer-controls">
          {!isRunning && !isFinished && timeLeft === selectedTopic.duration && (
            <button className="btn btn-primary btn-large" onClick={handleStart}>
              🎤 Start Presentation
            </button>
          )}
          {isRunning && (
            <button className="btn btn-secondary" onClick={handlePause}>
              ⏸ Pause
            </button>
          )}
          {!isRunning && timeLeft < selectedTopic.duration && !isFinished && (
            <button className="btn btn-primary" onClick={handleResume}>
              ▶ Resume
            </button>
          )}
          {(timeLeft < selectedTopic.duration || isFinished) && (
            <button className="btn btn-secondary" onClick={handleReset}>
              🔄 Reset
            </button>
          )}
        </div>
      </div>

      {isFinished && (
        <div className="results-banner">
          <h3>🎉 Time's Up!</h3>
          <p>Great job completing your presentation!</p>
        </div>
      )}

      <div className="tips-section">
        <h4>Presentation Tips:</h4>
        <ul>
          {selectedTopic.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="transcript-section">
        <div className="transcript-header">
          <h4>Your Speech</h4>
          <div className="stats-inline">
            <span>{wordCount} words</span>
            {wordsPerMinute > 0 && <span>~{wordsPerMinute} WPM</span>}
          </div>
        </div>
        <div className="transcript-content">
          {transcript || interimTranscript ? (
            <>
              <span>{transcript}</span>
              <span className="interim">{interimTranscript}</span>
            </>
          ) : (
            <span className="placeholder">Your speech will appear here as you present...</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default PresentationPractice
