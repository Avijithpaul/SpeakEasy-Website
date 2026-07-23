import { useState } from 'react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import BackButton from './ui/BackButton'
import './ReadingPractice.css'

const passages = [
  {
    id: 1,
    level: 'Easy',
    title: 'The Morning',
    text: 'The sun rises in the east. Birds sing in the trees. A new day begins with fresh air and bright light. People wake up and start their daily routines.',
  },
  {
    id: 2,
    level: 'Medium',
    title: 'Technology Today',
    text: 'Technology has transformed how we communicate and work. Smartphones connect people across the globe instantly. Artificial intelligence is becoming part of our everyday lives, from virtual assistants to recommendation systems.',
  },
  {
    id: 3,
    level: 'Hard',
    title: 'Climate Change',
    text: 'Climate change represents one of the most significant challenges facing humanity. Rising global temperatures are causing unprecedented weather patterns, affecting ecosystems and communities worldwide. Scientists emphasize the urgent need for sustainable practices and international cooperation.',
  },
]

function compareTexts(original, spoken) {
  const originalWords = original.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/)
  const spokenWords = spoken.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/)
  
  let matches = 0
  const results = originalWords.map((word, i) => {
    const isMatch = spokenWords[i] === word
    if (isMatch) matches++
    return { word, isMatch, spoken: spokenWords[i] || '' }
  })

  const accuracy = originalWords.length > 0 ? Math.round((matches / originalWords.length) * 100) : 0
  return { results, accuracy, matches, total: originalWords.length }
}

function ReadingPractice() {
  const [selectedPassage, setSelectedPassage] = useState(null)
  const [comparison, setComparison] = useState(null)
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

  const handleCompare = () => {
    if (selectedPassage && transcript) {
      const result = compareTexts(selectedPassage.text, transcript)
      setComparison(result)
    }
  }

  const handleReset = () => {
    resetTranscript()
    setComparison(null)
  }

  const handleSelectPassage = (passage) => {
    setSelectedPassage(passage)
    setComparison(null)
    resetTranscript()
  }

  if (!isSupported) {
    return (
      <div className="reading-practice">
        <BackButton />
        <div className="card error-card">
          <h2>Not Supported</h2>
          <p>Speech recognition is not supported in your browser.</p>
        </div>
      </div>
    )
  }

  if (!selectedPassage) {
    return (
      <div className="reading-practice">
        <BackButton />
        <h1 className="section-title">Read Aloud Practice</h1>
        <p className="section-desc">Choose a passage to practice reading aloud.</p>

        <div className="passage-list">
          {passages.map((passage) => (
            <button
              key={passage.id}
              className="passage-card"
              onClick={() => handleSelectPassage(passage)}
            >
              <span className={`level-badge level-${passage.level.toLowerCase()}`}>
                {passage.level}
              </span>
              <h3>{passage.title}</h3>
              <p>{passage.text.substring(0, 80)}...</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="reading-practice">
      <button className="back-btn" onClick={() => setSelectedPassage(null)}>
        ← Back to passages
      </button>

      <div className="passage-display">
        <div className="passage-header">
          <span className={`level-badge level-${selectedPassage.level.toLowerCase()}`}>
            {selectedPassage.level}
          </span>
          <h2>{selectedPassage.title}</h2>
        </div>
        
        {comparison ? (
          <div className="comparison-text">
            {comparison.results.map((item, i) => (
              <span key={i} className={item.isMatch ? 'match' : 'mismatch'}>
                {item.word}{' '}
              </span>
            ))}
          </div>
        ) : (
          <p className="passage-text">{selectedPassage.text}</p>
        )}
      </div>

      <div className="controls">
        <button
          className={`mic-btn-inline ${isListening ? 'listening' : ''}`}
          onClick={isListening ? stopListening : startListening}
        >
          <span>{isListening ? '🔴 Stop' : '🎤 Start Reading'}</span>
        </button>

        {transcript && !comparison && (
          <button className="btn btn-primary" onClick={handleCompare}>
            Compare
          </button>
        )}

        {(transcript || comparison) && (
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {comparison && (
        <div className="results-card">
          <div className="accuracy-display">
            <span className="accuracy-value">{comparison.accuracy}%</span>
            <span className="accuracy-label">Accuracy</span>
          </div>
          <p className="accuracy-detail">
            {comparison.matches} of {comparison.total} words matched
          </p>
          <div className="legend">
            <span><span className="dot match"></span> Correct</span>
            <span><span className="dot mismatch"></span> Needs practice</span>
          </div>
        </div>
      )}

      {!comparison && (transcript || interimTranscript) && (
        <div className="live-transcript">
          <h4>Your reading:</h4>
          <p>
            <span className="final-text">{transcript}</span>
            <span className="interim-text">{interimTranscript}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default ReadingPractice
