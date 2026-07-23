import { useState, useEffect } from 'react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { getConversationScenarios } from '../lib/api'
import BackButton from './ui/BackButton'
import './ConversationPractice.css'

function ConversationPractice() {
  const [scenarios, setScenarios] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState([])
  const [isComplete, setIsComplete] = useState(false)
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

    const loadScenarios = async () => {
      try {
        const data = await getConversationScenarios()

        if (!isMounted) {
          return
        }

        setScenarios(data || [])
      } catch {
        if (isMounted) {
          setLoadError('Could not load conversation scenarios. Please try again.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadScenarios()

    return () => {
      isMounted = false
    }
  }, [])

  const currentDialogue = selectedScenario?.dialogue[currentStep]
  const isYourTurn = currentDialogue?.role === 'you'

  useEffect(() => {
    if (transcript && !isListening && isYourTurn) {
      setResponses((prev) => [...prev, { step: currentStep, text: transcript }])
      resetTranscript()
    }
  }, [transcript, isListening, isYourTurn, currentStep, resetTranscript])

  const handleNext = () => {
    if (currentStep < selectedScenario.dialogue.length - 1) {
      setCurrentStep((prev) => prev + 1)
      resetTranscript()
    } else {
      setIsComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setResponses([])
    setIsComplete(false)
    resetTranscript()
  }

  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario)
    setCurrentStep(0)
    setResponses([])
    setIsComplete(false)
    resetTranscript()
  }

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  if (!isSupported) {
    return (
      <div className="conversation-practice">
        <BackButton />
        <div className="card error-card">
          <h2>Not Supported</h2>
          <p>Speech recognition is not supported in your browser.</p>
        </div>
      </div>
    )
  }

  if (!selectedScenario) {
    return (
      <div className="conversation-practice">
        <BackButton />
        <h1 className="section-title">Conversation Practice</h1>
        <p className="section-desc">Practice real-world conversations with interactive dialogue scenarios.</p>
        {isLoading && <p>Loading scenarios...</p>}
        {loadError && <p>{loadError}</p>}
        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <button key={scenario.id} className="scenario-card" onClick={() => handleSelectScenario(scenario)}>
              <span className="scenario-icon">{scenario.icon}</span>
              <h3>{scenario.title}</h3>
              <p>{scenario.context}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="conversation-practice">
        <button className="back-btn" onClick={() => setSelectedScenario(null)}>
          ← Back to scenarios
        </button>

        <div className="complete-card">
          <span className="complete-icon">Done</span>
          <h2>Conversation Complete!</h2>
          <p>Great job practicing the {selectedScenario.title} scenario.</p>

          <div className="response-summary">
            <h3>Your Responses:</h3>
            {responses.map((response, i) => (
              <div key={i} className="response-item">
                <span className="response-num">{i + 1}</span>
                <p>"{response.text}"</p>
              </div>
            ))}
          </div>

          <div className="complete-actions">
            <button className="btn btn-primary" onClick={handleRestart}>
              Practice Again
            </button>
            <button className="btn btn-secondary" onClick={() => setSelectedScenario(null)}>
              Try Another Scenario
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="conversation-practice">
      <button className="back-btn" onClick={() => setSelectedScenario(null)}>
        ← Back to scenarios
      </button>

      <div className="scenario-header">
        <span className="scenario-icon-small">{selectedScenario.icon}</span>
        <div>
          <h2>{selectedScenario.title}</h2>
          <p>{selectedScenario.context}</p>
        </div>
      </div>

      <div className="progress-indicator">
        {selectedScenario.dialogue.map((_, i) => (
          <div
            key={i}
            className={`progress-dot ${i < currentStep ? 'completed' : ''} ${i === currentStep ? 'current' : ''}`}
          />
        ))}
      </div>

      <div className="dialogue-area">
        {selectedScenario.dialogue.slice(0, currentStep + 1).map((item, i) => (
          <div key={i} className={`dialogue-bubble ${item.role === 'you' ? 'you' : 'other'}`}>
            <div className="bubble-header">
              <span className="role-label">
                {item.role === 'you' ? 'You' : item.role.charAt(0).toUpperCase() + item.role.slice(1)}
              </span>
              {item.role !== 'you' && (
                <button className="speak-btn" onClick={() => speakText(item.text)}>
                  Listen
                </button>
              )}
            </div>
            {item.role === 'you' ? (
              <div className="your-turn">
                <p className="prompt">Prompt: {item.prompt}</p>
                {responses.find((r) => r.step === i) ? (
                  <p className="your-response">"{responses.find((r) => r.step === i).text}"</p>
                ) : i === currentStep ? (
                  <div className="recording-area">
                    {transcript || interimTranscript ? (
                      <p className="live-text">
                        <span>{transcript}</span>
                        <span className="interim">{interimTranscript}</span>
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="other-text">{item.text}</p>
            )}
          </div>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dialogue-controls">
        {isYourTurn && !responses.find((r) => r.step === currentStep) ? (
          <button
            className={`mic-btn-conv ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? 'Stop Recording' : 'Speak Your Response'}
          </button>
        ) : (
          <button className="btn btn-primary btn-large" onClick={handleNext}>
            {currentStep < selectedScenario.dialogue.length - 1 ? 'Continue →' : 'Finish Conversation'}
          </button>
        )}
      </div>
    </div>
  )
}

export default ConversationPractice
