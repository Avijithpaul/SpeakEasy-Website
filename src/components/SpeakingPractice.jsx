import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import './SpeakingPractice.css'

function SpeakingPractice({ onBack }) {
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

  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0

  if (!isSupported) {
    return (
      <div className="speaking-practice">
        <button className="back-btn" onClick={onBack}>
          ← Back to modes
        </button>
        <div className="card error-card">
          <h2>Not Supported</h2>
          <p>Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="speaking-practice">
      <button className="back-btn" onClick={onBack}>
        ← Back to modes
      </button>

      <h1 className="section-title">Free Speaking Practice</h1>
      <p className="section-desc">
        Click the microphone and start speaking. Your speech will be transcribed in real-time.
      </p>

      <div className="mic-container">
        <button
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          onClick={isListening ? stopListening : startListening}
        >
          <span className="mic-icon">{isListening ? '🔴' : '🎤'}</span>
        </button>
        <p className="mic-status">
          {isListening ? 'Listening... Click to stop' : 'Click to start speaking'}
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="transcript-area">
        <div className="transcript-header">
          <h3>Your Speech</h3>
          {transcript && (
            <button className="btn btn-secondary" onClick={resetTranscript}>
              Clear
            </button>
          )}
        </div>
        <div className="transcript-box">
          {transcript || interimTranscript ? (
            <>
              <span className="final-text">{transcript}</span>
              <span className="interim-text">{interimTranscript}</span>
            </>
          ) : (
            <span className="placeholder">Your speech will appear here...</span>
          )}
        </div>
        {transcript && (
          <div className="stats">
            <span className="stat">
              <strong>{wordCount}</strong> words
            </span>
          </div>
        )}
      </div>

      <div className="tips-card">
        <h4>Tips for better recognition:</h4>
        <ul>
          <li>Speak clearly and at a moderate pace</li>
          <li>Use a quiet environment</li>
          <li>Position yourself close to the microphone</li>
          <li>Enunciate words properly</li>
        </ul>
      </div>
    </div>
  )
}

export default SpeakingPractice
