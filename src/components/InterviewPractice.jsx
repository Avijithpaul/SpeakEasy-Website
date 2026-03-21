import { useState, useEffect } from 'react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { getInterviewCategories } from '../lib/api'
import './InterviewPractice.css'

function InterviewPractice({ onBack }) {
  const [interviewCategories, setInterviewCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showTip, setShowTip] = useState(false)
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
    let isMounted = true

    const loadCategories = async () => {
      try {
        const data = await getInterviewCategories()

        if (!isMounted) {
          return
        }

        setInterviewCategories(data || [])
      } catch {
        if (isMounted) {
          setLoadError('Could not load interview questions. Please try again.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCategories()

    return () => {
      isMounted = false
    }
  }, [])

  const currentQuestion = selectedCategory?.questions[currentQuestionIndex]

  useEffect(() => {
    if (transcript && !isListening && currentQuestion) {
      setAnswers((prev) => {
        const newAnswers = [...prev]
        newAnswers[currentQuestionIndex] = transcript
        return newAnswers
      })
    }
  }, [transcript, isListening, currentQuestionIndex, currentQuestion])

  const handleNext = () => {
    if (currentQuestionIndex < selectedCategory.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setShowTip(false)
      resetTranscript()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setShowTip(false)
      resetTranscript()
    }
  }

  const handleRetry = () => {
    resetTranscript()
    setAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[currentQuestionIndex] = undefined
      return newAnswers
    })
  }

  const handleSelectCategory = (category) => {
    setSelectedCategory(category)
    setCurrentQuestionIndex(0)
    setAnswers([])
    setShowTip(false)
    resetTranscript()
  }

  const speakQuestion = () => {
    if ('speechSynthesis' in window && currentQuestion) {
      speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  const currentAnswer = answers[currentQuestionIndex]

  if (!isSupported) {
    return (
      <div className="interview-practice">
        <button className="back-btn" onClick={onBack}>
          ← Back to modes
        </button>
        <div className="card error-card">
          <h2>Not Supported</h2>
          <p>Speech recognition is not supported in your browser.</p>
        </div>
      </div>
    )
  }

  if (!selectedCategory) {
    return (
      <div className="interview-practice">
        <button className="back-btn" onClick={onBack}>
          ← Back to modes
        </button>
        <h1 className="section-title">Interview Practice</h1>
        <p className="section-desc">Practice answering common interview questions with AI feedback.</p>
        {isLoading && <p>Loading interview categories...</p>}
        {loadError && <p>{loadError}</p>}
        <div className="category-grid">
          {interviewCategories.map((category) => (
            <button key={category.id} className="category-card" onClick={() => handleSelectCategory(category)}>
              <span className="category-icon">{category.icon}</span>
              <h3>{category.title}</h3>
              <p>{category.questions.length} questions</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="interview-practice">
      <button className="back-btn" onClick={() => setSelectedCategory(null)}>
        ← Back to categories
      </button>

      <div className="interview-header">
        <span className="category-icon-small">{selectedCategory.icon}</span>
        <h2>{selectedCategory.title}</h2>
      </div>

      <div className="question-progress">
        <span>
          Question {currentQuestionIndex + 1} of {selectedCategory.questions.length}
        </span>
        <div className="progress-bar-mini">
          <div
            className="progress-fill-mini"
            style={{ width: `${((currentQuestionIndex + 1) / selectedCategory.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="question-card">
        <div className="question-header">
          <h3>Question:</h3>
          <button className="speak-btn" onClick={speakQuestion} title="Listen to question">
            Listen
          </button>
        </div>
        <p className="question-text">{currentQuestion.question}</p>

        <button className="tip-toggle" onClick={() => setShowTip(!showTip)}>
          {showTip ? 'Hide Tip' : 'Show Tip'}
        </button>

        {showTip && (
          <div className="tip-box">
            <p>{currentQuestion.tip}</p>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="answer-section">
        <div className="answer-header">
          <h4>Your Answer:</h4>
          {currentAnswer && (
            <button className="btn btn-secondary btn-small" onClick={handleRetry}>
              Retry
            </button>
          )}
        </div>

        {!currentAnswer ? (
          <div className="recording-section">
            <button
              className={`mic-btn-interview ${isListening ? 'listening' : ''}`}
              onClick={isListening ? stopListening : startListening}
            >
              <span className="mic-icon">{isListening ? 'REC' : 'MIC'}</span>
              <span>{isListening ? 'Stop Recording' : 'Start Answer'}</span>
            </button>

            {(transcript || interimTranscript) && (
              <div className="live-preview">
                <span>{transcript}</span>
                <span className="interim">{interimTranscript}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="answer-display">
            <p>"{currentAnswer}"</p>
            <div className="answer-stats">
              <span>{currentAnswer.split(/\s+/).length} words</span>
            </div>
          </div>
        )}
      </div>

      <div className="navigation">
        <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          ← Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={currentQuestionIndex === selectedCategory.questions.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default InterviewPractice
